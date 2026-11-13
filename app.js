import { SOURCE_URL, questions, createGame, answerQuestion, nextQuestion, getScore } from "./game.js";

const stage = document.querySelector("#stage");
const track = document.querySelector("#track");
const score = document.querySelector("#score");
const progress = document.querySelector("#progress");
const status = document.querySelector("#status");
let game = createGame();

function sourceMarkup(question) {
  return question.creatorSupplied
    ? '<span class="source-label">SOURCE: QUIZ CREATOR / NOT VERIFIED ONLINE</span>'
    : `<a href="${SOURCE_URL}" target="_blank" rel="noopener noreferrer">Source: BalleDj on Eventzonen ↗</a>`;
}

function updateStats() {
  score.textContent = `SCORE: ${String(getScore(game)).padStart(2, "0")}`;
  progress.setAttribute("aria-valuenow", game.answers.length);
  progress.querySelector("span").style.width = `${game.answers.length / questions.length * 100}%`;
}

function focusHeading() {
  stage.querySelector("h2").focus({ preventScroll: true });
}

function renderQuestion() {
  const question = questions[game.index];
  updateStats();
  track.textContent = `TRACK ${String(game.index + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
  status.textContent = "● Pick your answer. Make it a good one.";
  stage.innerHTML = `
    <p class="mini-label">${question.creatorSupplied ? "CREATOR-SUPPLIED BONUS" : "FROM THE PUBLIC PROFILE"}</p>
    <h2 class="question-heading" tabindex="-1">${question.question}</h2>
    <div class="answers" role="group" aria-label="Choose one answer">
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
      button.querySelector(".result-icon").textContent = "✓ CORRECT";
    } else if (index === option) {
      button.classList.add("wrong");
      button.querySelector(".result-icon").textContent = "× YOUR PICK";
    }
  });
  updateStats();
  status.textContent = correct ? "● Nice one. That's a hit!" : "● A deep cut. Now you know!";
  document.querySelector("#feedback").innerHTML = `
    <div class="feedback"><p><b>${correct ? "That's a hit!" : "Not this time."}</b> ${question.explanation}</p><p>${sourceMarkup(question)}</p></div>`;
  const next = document.createElement("button");
  next.type = "button";
  next.className = "primary";
  next.textContent = game.index === questions.length - 1 ? "SEE MY SCORE ↗" : "NEXT TRACK →";
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
  track.textContent = "THAT'S A WRAP / SET COMPLETE";
  status.textContent = "● Thanks for visiting the fan zone.";
  const title = total === questions.length ? "Certified Balle connoisseur." : total >= 5 ? "You know your way around the decks." : "Every fan starts somewhere.";
  stage.innerHTML = `
    <p class="mini-label">YOUR FINAL MIX</p>
    <h2 tabindex="-1">${title}</h2>
    <p class="result-score">${total}<span style="font-size:30px;letter-spacing:-1px"> / ${questions.length}</span></p>
    <p class="intro">Seven profile-based questions + one creator-supplied bonus.<br>Same good vibes, whatever the score.</p>
    <button type="button" class="primary" id="restart">PLAY IT AGAIN ↻</button>
    <details class="review"><summary>VIEW YOUR ANSWERS &amp; SOURCES</summary><ol>${questions.map((question, index) => `
      <li><b>${question.question}</b><p>${game.answers[index] === question.correct ? "Correct" : "Incorrect"} · Your answer: ${question.options[game.answers[index]]}<br>Correct answer: ${question.options[question.correct]}</p><p>${question.explanation}</p><p class="review-source">${sourceMarkup(question)}</p></li>`).join("")}</ol></details>`;
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
  motion.textContent = paused ? "Resume animations" : "Pause animations";
  motion.disabled = reducedMotion.matches;
  if (reducedMotion.matches) motion.textContent = "Reduced motion enabled";
}

setMotion(reducedMotion.matches);
reducedMotion.addEventListener("change", event => setMotion(event.matches));
motion.addEventListener("click", () => setMotion(motion.getAttribute("aria-pressed") !== "true"));
