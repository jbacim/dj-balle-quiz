export const SOURCE_URL = "https://eventzonen.dk/balledj";

export const questions = [
  {
    question: "Which hometown is listed on BalleDj's profile?",
    options: ["Aarhus", "Silkeborg", "Odense"],
    correct: 1,
    explanation: "His Eventzonen profile lists Silkeborg under “Hjemby” (hometown).",
  },
  {
    question: "Around which year does he say he started DJing?",
    options: ["2003", "1993", "1983"],
    correct: 2,
    explanation: "BalleDj says he has played as a DJ since around 1983. “Around” matters: the profile does not give an exact debut date.",
  },
  {
    question: "How many years does he say he spent as a full-time DJ?",
    options: ["Four years", "One year", "Ten years"],
    correct: 0,
    explanation: "In his profile, he describes four years as a full-time DJ.",
  },
  {
    question: "Which two other countries does he mention working in?",
    options: ["Germany and France", "Norway and Sweden", "Spain and Italy"],
    correct: 1,
    explanation: "He says part of his DJ career was spent in Norway and Sweden. This is the Silkeborg-based BalleDj's own account, not a reference to the Norwegian artist DJ Balle.",
  },
  {
    question: "Which venue does he name when recalling Friday dances?",
    options: ["Skals Kro", "Royal Arena", "Vega"],
    correct: 0,
    explanation: "His profile mentions Friday dances at Skals Kro among the places and events he has played.",
  },
  {
    question: "What does he say guides his music choices?",
    options: ["Only playing his personal favourites", "Avoiding familiar songs", "Reading the audience"],
    correct: 2,
    explanation: "He describes reading the audience and playing music guests know, including songs they thought they had forgotten.",
  },
  {
    question: "How many weddings does his profile say he played in 2024?",
    options: ["Six", "Sixteen", "Sixty"],
    correct: 1,
    explanation: "The profile reports 16 weddings in 2024, as well as other parties. This is a historical claim about 2024, not his current booking count.",
  },
  {
    question: "Which song does he love?",
    options: ["Sandstorm", "Barbie Girl", "Portugal"],
    correct: 2,
    creatorSupplied: true,
    explanation: "Portugal! This answer was supplied by the quiz creator. We could not independently verify this preference online; the two other song titles are simply distractors.",
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
