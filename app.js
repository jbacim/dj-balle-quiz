import { SOURCE_URL, questions, createGame, answerQuestion, nextQuestion, getScore } from "./game.js";

const stage = document.querySelector("#stage");
const track = document.querySelector("#track");
const score = document.querySelector("#score");
const progress = document.querySelector("#progress");
const status = document.querySelector("#status");
let game = createGame();

function sourceMarkup(question) {
  return question.creatorSupplied
    ? '<span class="source-label">KILDE: QUIZBESTILLEREN / IKKE BEKRÆFTET ONLINE</span>'
    : `<a href="${SOURCE_URL}" target="_blank" rel="noopener noreferrer">Kilde: BalleDj på Eventzonen ↗</a>`;
}

function updateStats() {
  score.textContent = `POINT: ${String(getScore(game)).padStart(2, "0")}`;
  progress.setAttribute("aria-valuenow", game.answers.length);
  progress.querySelector("span").style.width = `${game.answers.length / questions.length * 100}%`;
}

function focusHeading() {
  stage.querySelector("h2").focus({ preventScroll: true });
}

function renderQuestion() {
  const question = questions[game.index];
  updateStats();
  track.textContent = `SPØRGSMÅL ${String(game.index + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
  status.textContent = "● Vælg dit svar. Giv den gas!";
  stage.innerHTML = `
    <p class="mini-label">${question.creatorSupplied ? "BONUS FRA QUIZBESTILLEREN" : "FRA DEN OFFENTLIGE PROFIL"}</p>
    <h2 class="question-heading" tabindex="-1">${question.question}</h2>
    <div class="answers" role="group" aria-label="Vælg ét svar">
      ${question.options.map((option, index) => `<button type="button" class="answer" data-option="${index}"><span class="letter" aria-hidden="true">${String.fromCharCode(65 + index)}</span><span>${option}</span><span class="result-icon"></span></button>`).join("")}
    </div>
    <div id="feedback" aria-live="polite" aria-atomic="true"></div>`;
  stage.querySelectorAll(".answer").forEach(button => {
    button.addEventListener("click", () => revealAnswer(Number(button.dataset.option)));
  });
  focusHeading();
}

function revealAnswer(option) {
  game = answerQuestion(game, option);
  const question = questions[game.index];
  const correct = option === question.correct;
  stage.querySelectorAll(".answer").forEach((button, index) => {
    button.disabled = true;
    if (index === question.correct) {
      button.classList.add("correct");
      button.querySelector(".result-icon").textContent = "✓ RIGTIGT";
    } else if (index === option) {
      button.classList.add("wrong");
      button.querySelector(".result-icon").textContent = "× DIT SVAR";
    }
  });
  updateStats();
  status.textContent = correct ? "● Sådan! Den sad lige i skabet." : "● Den var svær. Nu ved du det!";
  document.querySelector("#feedback").innerHTML = `
    <div class="feedback"><p><b>${correct ? "Det er et hit!" : "Ikke denne gang."}</b> ${question.explanation}</p><p>${sourceMarkup(question)}</p></div>`;
  const next = document.createElement("button");
  next.type = "button";
  next.className = "primary";
  next.textContent = game.index === questions.length - 1 ? "SE MIT RESULTAT ↗" : "NÆSTE SPØRGSMÅL →";
  next.addEventListener("click", () => {
    game = nextQuestion(game);
    if (game.finished) renderResult();
    else renderQuestion();
  });
  stage.append(next);
  next.focus({ preventScroll: true });
}

function renderResult() {
  const total = getScore(game);
  track.textContent = "TAK FOR DANSEN / QUIZ SLUT";
  status.textContent = "● Tak for besøget på fansiden.";
  const title = total === questions.length ? "Du er en ægte Balle-kender!" : total >= 5 ? "Du har styr på pladerne!" : "Alle fans starter et sted.";
  stage.innerHTML = `
    <p class="mini-label">DIT ENDELIGE MIX</p>
    <h2 tabindex="-1">${title}</h2>
    <p class="result-score">${total}<span style="font-size:30px;letter-spacing:-1px"> / ${questions.length}</span></p>
    <p class="intro">Syv spørgsmål fra profilen + én bonus fra quizbestilleren.<br>God stemning, uanset hvor mange point du fik.</p>
    <button type="button" class="primary" id="restart">SPIL IGEN ↻</button>
    <details class="review"><summary>SE DINE SVAR &amp; KILDER</summary><ol>${questions.map((question, index) => `
      <li><b>${question.question}</b><p>${game.answers[index] === question.correct ? "Rigtigt" : "Forkert"} · Dit svar: ${question.options[game.answers[index]]}<br>Rigtigt svar: ${question.options[question.correct]}</p><p>${question.explanation}</p><p class="review-source">${sourceMarkup(question)}</p></li>`).join("")}</ol></details>`;
  document.querySelector("#restart").addEventListener("click", startGame);
  focusHeading();
}

function startGame() {
  game = createGame();
  renderQuestion();
}

document.querySelector("#start").addEventListener("click", startGame);

const motion = document.querySelector("#motion");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setMotion(paused) {
  document.body.classList.toggle("paused", paused);
  motion.setAttribute("aria-pressed", String(paused));
  motion.textContent = paused ? "Fortsæt animationer" : "Sæt animationer på pause";
  motion.disabled = reducedMotion.matches;
  if (reducedMotion.matches) motion.textContent = "Reduceret bevægelse er slået til";
}

setMotion(reducedMotion.matches);
reducedMotion.addEventListener("change", event => setMotion(event.matches));
motion.addEventListener("click", () => setMotion(motion.getAttribute("aria-pressed") !== "true"));
