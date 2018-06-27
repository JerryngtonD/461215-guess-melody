import {assert} from 'chai';
import {getComparison} from '../show-result';

const STATISTICS = [
  {
    scores: 25,
    remainNotes: 2,
    remainTimes: 22,
    id: 120
  },
  {
    scores: 14,
    remainNotes: 2,
    remainTimes: 22,
    id: 121
  },
  {
    scores: 1,
    remainNotes: 2,
    remainTimes: 22,
    id: 122
  },
  {
    scores: 4,
    remainNotes: 2,
    remainTimes: 22,
    id: 123
  },
  {
    scores: 6,
    remainNotes: 2,
    remainTimes: 22,
    id: 124
  },
  {
    scores: 8,
    remainNotes: 2,
    remainTimes: 22,
    id: 125
  },
  {
    scores: 100,
    remainNotes: 2,
    remainTimes: 22,
    id: 126
  },
  {
    scores: 1,
    remainNotes: 2,
    remainTimes: 22,
    id: 127
  },
  {
    scores: 8,
    remainNotes: 2,
    remainTimes: 22,
    id: 128
  }
];

describe(`Result page`, () => {
  describe(`Show result`, () => {
    it(`correct position and persentage info`, () => {
      assert.equal(getComparison(STATISTICS, {
        scores: 8,
        remainNotes: 2,
        remainTimes: 22,
        id: 125
      }), `Вы заняли 4-ое место из 9. Это лучше чем у 56% игроков.`);

      assert.equal(getComparison(STATISTICS, {
        scores: 100,
        remainNotes: 2,
        remainTimes: 22,
        id: 126
      }), `Вы заняли 1-ое место из 9. Это лучше чем у 89% игроков.`);

      assert.equal(getComparison(STATISTICS, {
        scores: 1,
        remainNotes: 2,
        remainTimes: 22,
        id: 127
      }), `Вы заняли 9-ое место из 9. Это лучше чем у 0% игроков.`);
    });
  });
});
