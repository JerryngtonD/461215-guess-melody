import {assert} from 'chai';
import {times} from '../utils';
import {
  calculateResult,
  MAX_ANSWERS,
  LIFE_COUNT
} from '../calculate-result';

const TEST_ANSWERS = {
  quick: {
    isRight: true,
    time: 10
  },
  correct: {
    isRight: true,
    time: 50
  },
  incorrect: {
    isRight: false,
    time: 10
  }
};

describe(`Result page`, () => {
  describe(`Calculate result`, () => {
    it(`Minimum correct answers is 10. If not then return -1`, () => {
      assert.equal(
          calculateResult([TEST_ANSWERS.correct], 2),
          -1
      );
    });

    it(`if time up limit then -1`, () => {
      assert.equal(
          calculateResult(times(10, TEST_ANSWERS.correct), 2),
          -1
      );
    });

    it(`2 slow and 8 quick answer return 18`, () => {
      assert.equal(calculateResult(
          [
            ...times(2, TEST_ANSWERS.correct),
            ...times(8, TEST_ANSWERS.quick)
          ], 2), 18);
    });

    it(`10 correct ans quick answers return 20 point`, () => {
      assert.equal(
          calculateResult(times(10, TEST_ANSWERS.quick), 2),
          20
      );
    });

    it(`zero answers return -1 point`, () => {
      assert.equal(
          calculateResult([], 2),
          -1
      );
    });

    it(`if don't remain notes return -1`, () => {
      assert.equal(
          calculateResult(times(10, TEST_ANSWERS.correct), 0),
          -1
      );
    });

    it(`${LIFE_COUNT} incorrect and ${MAX_ANSWERS - LIFE_COUNT} quick answer return 8`, () => {
      assert.equal(calculateResult(
          [
            ...times(LIFE_COUNT, TEST_ANSWERS.incorrect),
            ...times(MAX_ANSWERS - LIFE_COUNT, TEST_ANSWERS.quick)
          ], 2), 8);
    });

    it(`1 incorrect and 9 quick answer return 16`, () => {
      assert.equal(calculateResult(
          [
            ...times(1, TEST_ANSWERS.incorrect),
            ...times(9, TEST_ANSWERS.quick)
          ], 1), 16);
    });

    it(`correct handle function arguments`, () => {
      assert.equal(-1, calculateResult());
      assert.equal(-1, calculateResult(1));
      assert.equal(-1, calculateResult(true));
      assert.equal(-1, calculateResult(`test`));
      assert.equal(-1, calculateResult(NaN));
      assert.equal(-1, calculateResult(null));
      assert.equal(-1, calculateResult({}));
    });
  });
});
