import test from "node:test";
import assert from "node:assert/strict";
import { SOURCE_URL, questions, createGame, answerQuestion, nextQuestion, getScore } from "./game.js";

test("eight questions have three distinct options and a valid correct answer", () => {
  assert.equal(questions.length, 8);
  for (const question of questions) {
    assert.equal(new Set(question.options).size, 3);
    assert.ok(Number.isInteger(question.correct));
    assert.ok(question.correct >= 0 && question.correct < 3);
    assert.ok(question.explanation.length > 30);
  }
});

test("Portugal is the explicitly creator-supplied answer, separate from sourced facts", () => {
  const bonus = questions.filter(question => question.creatorSupplied);
  assert.equal(bonus.length, 1);
  assert.equal(bonus[0].options[bonus[0].correct], "Portugal");
  assert.match(bonus[0].explanation, /could not independently verify/);
  assert.equal(SOURCE_URL, "https://eventzonen.dk/balledj");
});

test("a perfect round reaches completion and scores eight", () => {
  let game = createGame();
  for (const question of questions) {
    game = answerQuestion(game, question.correct);
    game = nextQuestion(game);
  }
  assert.equal(game.finished, true);
  assert.equal(getScore(game), 8);
  assert.equal(game.answers.length, 8);
  assert.throws(() => answerQuestion(game, 0));
  assert.throws(() => nextQuestion(game));
});

test("wrong and mixed rounds score correctly", () => {
  for (const expected of [0, 3, 7]) {
    let game = createGame();
    questions.forEach((question, index) => {
      game = answerQuestion(game, index < expected ? question.correct : (question.correct + 1) % 3);
      game = nextQuestion(game);
    });
    assert.equal(getScore(game), expected);
    assert.equal(game.finished, true);
  }
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
