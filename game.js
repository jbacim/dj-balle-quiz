export const SOURCE_URL = "https://eventzonen.dk/balledj";
export const BOOKING_URL = "https://www.123festmusik.dk/djvenga";

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
    question: "Hvilket kroarrangement nævner BalleDJ selv som en del af sin karriere?",
    options: ["Lørdagsbal på Ans Kro", "Halbal i Them", "Fredagsbal på Skals Kro", "Søndagsdans på Svostrup Kro"],
    correct: 2,
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
    question: "Hvad hedder det mobile diskotek, som BalleDJ er tilknyttet på sin anden bookingprofil?",
    options: ["Atlantis", "Apollo", "ODEON", "Studio Balle"],
    correct: 2,
    sourceUrl: BOOKING_URL,
    sourceLabel: "BalleDJ på 123festmusik",
    explanation: "På 123festmusik hedder profilen “Mobil Diskotek ODEON - BalleDJ” og angiver Silkeborg som hjemby.",
  },
  {
    question: "Hvor lang tid før festen oplyser han, at udstyret stilles op?",
    options: ["30 minutter", "1 time", "1½ time", "2½ time"],
    correct: 2,
    sourceUrl: BOOKING_URL,
    sourceLabel: "BalleDJ på 123festmusik",
    explanation: "Bookingprofilen hos 123festmusik oplyser, at udstyret stilles op 1,5 time før. Oplysningen kan ændre sig.",
  },
  {
    question: "Hvilken type fest nævnes ikke eksplicit som et af BalleDJs specialer i profilteksten?",
    options: ["Sølvbryllup", "80’er-fest", "Firmafest", "Studenterfest"],
    correct: 3,
    explanation: "Profilteksten nævner sølvbryllupper, 80’er-fester og firmafester, men ikke studenterfester i opremsningen af specialer. Det betyder ikke, at han ikke spiller til studenterfester.",
  },
  {
    question: "Hvad hedder et BalleDJ-mix, der kan spores tilbage til december 2011?",
    options: ["Den Store Balleblanding", "Lille Nat Mix", "ODEON After Dark", "Skals Kro Megamix"],
    correct: 1,
    creatorSupplied: true,
    explanation: "“Lille Nat Mix” og dateringen til december 2011 er oplyst af quizbestilleren. Vi har ikke kunnet bekræfte oplysningerne uafhængigt online.",
  },
  {
    question: "Hvad hedder DJ Balle?",
    options: ["Lars", "Jens", "Emil", "Marcus"],
    correct: 0,
    explanation: "Anmeldelserne på BalleDJs profil på Eventzonen omtaler ham som Lars.",
  },
  {
    question: "Hvilken særlig fødselsdag spillede Lars til ifølge en anmeldelse fra 2020?",
    options: ["En dobbelt 70-års fødselsdag", "En samlet 80-års fødselsdag", "En samlet 90-års fødselsdag", "En 100-års fødselsdag"],
    correct: 2,
    explanation: "En anmeldelse fra august 2020 fortæller, at Lars spillede til et pars samlede 90-års fødselsdagsfest.",
  },
  {
    question: "Hvilken bedømmelse havde BalleDJ på Eventzonen, da siden blev læst den 13. november 2026?",
    options: ["4,2", "4,5", "4,8", "5,0"],
    correct: 2,
    explanation: "Eventzonen viste 4,8 ud af 5 baseret på fem anmeldelser ved opslaget den 13. november 2026. Bedømmelser kan ændre sig; den anden bookingprofil har sin egen bedømmelse.",
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
