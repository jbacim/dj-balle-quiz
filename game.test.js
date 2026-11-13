import test from "node:test";
import assert from "node:assert/strict";
import { SOURCE_URL, questions, createGame, answerQuestion, nextQuestion, getScore } from "./game.js";

test("questions have distinct options and a valid correct answer", () => {
  assert.equal(questions.length, 15);
  for (const question of questions) {
    assert.ok([3, 4].includes(question.options.length));
    assert.equal(new Set(question.options).size, question.options.length);
    assert.ok(Number.isInteger(question.correct));
    assert.ok(question.correct >= 0 && question.correct < question.options.length);
    assert.ok(question.explanation.length > 30);
  }
});

test("Portugal is the explicitly creator-supplied answer, separate from sourced facts", () => {
  const bonus = questions.filter(question => question.creatorSupplied);
  assert.deepEqual(bonus.map(question => question.options[question.correct]).sort(), ["Lille Nat Mix", "Portugal"]);
  for (const question of bonus) assert.match(question.explanation, /ikke kunnet bekræfte/);
  assert.equal(SOURCE_URL, "https://eventzonen.dk/balledj");
});

test("a perfect round reaches completion and scores every point", () => {
  let game = createGame();
  for (const question of questions) {
    game = answerQuestion(game, question.correct);
    game = nextQuestion(game);
  }
  assert.equal(game.finished, true);
  assert.equal(getScore(game), questions.length);
  assert.equal(game.answers.length, questions.length);
  assert.throws(() => answerQuestion(game, 0));
  assert.throws(() => nextQuestion(game));
});

test("wrong and mixed rounds score correctly", () => {
  for (const expected of [0, 3, 7]) {
    let game = createGame();
    questions.forEach((question, index) => {
      game = answerQuestion(game, index < expected ? question.correct : (question.correct + 1) % question.options.length);
      game = nextQuestion(game);
    });

    assert.equal(getScore(game), expected);
    assert.equal(game.finished, true);
  }
});

test("all requested four-choice questions have the specified correct answer", () => {
  for (const answer of ["ODEON", "Fredagsbal på Skals Kro", "1½ time", "Studenterfest", "Lille Nat Mix", "Lars", "En samlet 90-års fødselsdag", "4,8"]) {
    const matches = questions.filter(question => question.options[question.correct] === answer);
    assert.equal(matches.length, 1, `${answer} must appear once`);
    assert.equal(matches[0].options.length, 4);
  }
});

test("the fourth answer is accepted for a four-option question", () => {
  let game = createGame();
  while (questions[game.index].options.length !== 4) {
    game = nextQuestion(answerQuestion(game, 0));
  }
  game = answerQuestion(game, 3);
  assert.equal(game.answers.at(-1), 3);
  assert.throws(() => answerQuestion(createGame(), 3));
});

test("cannot skip, double-answer, or pass invalid answers", () => {
  const game = createGame();
  assert.throws(() => nextQuestion(game));
  for (const invalid of [-1, 3, 0.5, NaN, "1"]) assert.throws(() => answerQuestion(game, invalid));
  const answered = answerQuestion(game, 1);
  assert.throws(() => answerQuestion(answered, 0));
  assert.deepEqual(game, { index: 0, answers: [], finished: false });
  assert.deepEqual(createGame(), game);
});
