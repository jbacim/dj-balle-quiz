export const SOURCE_URL = "https://eventzonen.dk/balledj";

export const questions = [
  {
    question: "Hvilken hjemby står på BalleDjs profil?",
    options: ["Aarhus", "Silkeborg", "Odense"],
    correct: 1,
    explanation: "På hans profil på Eventzonen står Silkeborg under “Hjemby”.",
  },
  {
    question: "Omkring hvilket år begyndte han ifølge sin profil som DJ?",
    options: ["2003", "1993", "1983"],
    correct: 2,
    explanation: "BalleDj fortæller, at han har spillet som DJ siden omkring 1983. Bemærk “omkring”: profilen angiver ikke en præcis debutdato.",
  },
  {
    question: "Hvor mange år var han ifølge profilen fuldtids-DJ?",
    options: ["Fire år", "Ét år", "Ti år"],
    correct: 0,
    explanation: "I profilteksten fortæller han, at fire af årene var som fuldtids-DJ.",
  },
  {
    question: "Hvilke to andre lande nævner han at have arbejdet i?",
    options: ["Tyskland og Frankrig", "Norge og Sverige", "Spanien og Italien"],
    correct: 1,
    explanation: "Han fortæller, at en del af tiden som DJ var i Norge og Sverige. Det er BalleDj fra Silkeborg, der beskriver sin karriere, ikke den norske kunstner DJ Balle.",
  },
  {
    question: "Hvilket spillested nævner han i forbindelse med fredagsbal?",
    options: ["Skals Kro", "Royal Arena", "Vega"],
    correct: 0,
    explanation: "Profilen nævner fredagsbal på Skals Kro blandt de steder og arrangementer, han har spillet til.",
  },
  {
    question: "Hvad lægger han ifølge profilen vægt på, når han vælger musik?",
    options: ["Kun at spille sine egne favoritter", "At undgå kendte sange", "At læse publikum"],
    correct: 2,
    explanation: "Han beskriver, at han læser publikum og spiller musik, gæsterne kender, også den musik, de troede, de havde glemt.",
  },
  {
    question: "Hvor mange bryllupper spillede han ifølge profilen til i 2024?",
    options: ["Seks", "Seksten", "Tres"],
    correct: 1,
    explanation: "Profilen fortæller om 16 bryllupper i 2024 samt en del andre fester. Tallet gælder 2024, ikke hans aktuelle antal bookinger.",
  },
  {
    question: "Hvilken sang elsker han?",
    options: ["Sandstorm", "Barbie Girl", "Portugal"],
    correct: 2,
    creatorSupplied: true,
    explanation: "Portugal! Svaret er oplyst af quizbestilleren. Vi har ikke kunnet bekræfte denne præference uafhængigt online. De to andre sangtitler er blot forkerte svarmuligheder.",
  },
];

export function createGame() {
  return { index: 0, answers: [], finished: false };
}

export function answerQuestion(game, option) {
  if (game.finished || game.answers.length !== game.index ||
      !Number.isInteger(option) || option < 0 ||
      option >= questions[game.index].options.length) {
    throw new Error("Choose one valid answer to the current unanswered question.");
  }
  return { ...game, answers: [...game.answers, option] };
}

export function nextQuestion(game) {
  if (game.finished || game.answers.length !== game.index + 1) {
    throw new Error("Answer the current question before continuing.");
  }
  return game.index === questions.length - 1
    ? { ...game, finished: true }
    : { ...game, index: game.index + 1 };
}

export function getScore(game) {
  return game.answers.reduce((score, answer, index) =>
    score + Number(answer === questions[index].correct), 0);
}
