import {assert} from 'chai';
import {getComparison} from '../show-result';

const STATISTICS = [
  {
    scores: 25,
    remainNotes: 2,
    remainTimes: 22
  },
  {
    scores: 14,
    remainNotes: 2,
    remainTimes: 22
  },
  {
    scores: 1,
    remainNotes: 2,
    remainTimes: 22
  },
  {
    scores: 4,
    remainNotes: 2,
    remainTimes: 22
  },
  {
    scores: 6,
    remainNotes: 2,
    remainTimes: 22
  },
];

describe(`Result page`, () => {
  describe(`Show result`, () => {
    it(`correct position and persentage info`, () => {
      assert.equal(getComparison(STATISTICS, {
        scores: 8,
        remainNotes: 2,
        remainTimes: 22
      }), `Вы заняли 3-ое место из 6. Это лучше чем у 50% игроков.`);

      assert.equal(getComparison(STATISTICS, {
        scores: 100,
        remainNotes: 2,
        remainTimes: 22
      }), `Вы заняли 1-ое место из 6. Это лучше чем у 83% игроков.`);

      assert.equal(getComparison(STATISTICS, {
        scores: 1,
        remainNotes: 2,
        remainTimes: 22
      }), `Вы заняли 6-ое место из 6. Это лучше чем у 0% игроков.`);
    });

    it(`get position and persentage if statistics are empty`, () => {
      assert.equal(getComparison([], {
        scores: 8,
        remainNotes: 2,
        remainTimes: 22
      }), `Вы заняли 1-ое место из 1. Это лучше чем у 0% игроков.`);
    });
  });
});
