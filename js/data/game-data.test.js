import {assert} from 'chai';

import {getTotalScore, searchInsert, showResults, Timer, userAnswers as immutableUserData} from "./game-data";

describe(`Array`, () => {
  describe(`#indexOf()`, () => {
    it(`should return -1 when the value is not present`, () => {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});


let testAnswers = JSON.parse(JSON.stringify(immutableUserData));
describe(`User options / types / game logic were tested here`, () => {

  beforeEach(function () {
    testAnswers = JSON.parse(JSON.stringify(immutableUserData));
  });


  describe(`Check user answers `, () => {
    it(`Should return true because it is right answer to 1 question`, () => {
      assert.equal(testAnswers[0].isRight, true);
    });

    const checkEveryElemType = (collection) => {
      let isEveryElemObject = true;
      for (let item of collection) {
        if (typeof item !== `object`) {
          isEveryElemObject = false;
        }
      }
      return isEveryElemObject;
    };

    it(`Should return true because every user answer has the type is object`, () => {
      let isEveryElemObject = checkEveryElemType(testAnswers);
      assert.equal(isEveryElemObject, true);
    });

    it(`Should return false because one user answer has the type is number`, () => {
      let changedAnswers = Object.assign([], testAnswers);
      changedAnswers[0] = 3;
      let isEveryElemObject = checkEveryElemType(changedAnswers);
      assert.equal(isEveryElemObject, false);
    });
  });


  describe(`Check game-state of score at the end`, () => {
    it(`Check total score of test answers`, () => {
      assert.deepEqual(getTotalScore(testAnswers), {total: -4, isProcessed: true});
    });

    it(`If we  will pass into the function less count of arguments [testAnswers.length < 10], it should return -1`, () => {
      let lessAnswers = (Object.assign([], immutableUserData)).slice(0, 5);
      assert.equal(getTotalScore(lessAnswers), -1);
    });

    it(`The case when user has answered to all questions correctly but he did this slowly`, () => {
      let answers = Object.assign([], testAnswers);
      answers.forEach((answer) => {
        answer.isRight = true;
        answer.questionTime = 50;
      });
      assert.equal(getTotalScore(answers).total, 10);
    });
  });

  describe(`Check statistics with passed somebody's new results`, () => {
    it(`It should show position where we need to insert our totalScore `, () => {
      assert.equal(searchInsert([2, 2, 6, 6, 7, 8, 8, 9, 13], 7), 4);
    });

    it(`Should  show result win message`, () => {
      let results = [-3, 3, 6, 7, 8, 8, 9, 12, 14, 15, 16];
      let caseAnswers = Object.assign([], testAnswers);
      for (let answer of caseAnswers) {
        answer.isRight = true;
      }

      let userResults = {
        timeLeft: 120,
        answers: caseAnswers,
        attempts: 1
      };
      assert.equal(showResults(results.slice(), userResults), `Вы заняли 3 место из ${results.length + 1} игроков. Это лучше, чем у 83% игроков`);
    });

    it(`Should show that you lost cause attempts`, () => {
      let results = [-3, 3, 6, 7, 8, 8, 9, 12, 14, 15, 16];
      let caseAnswers = (Object.assign([], testAnswers)).slice(0, 5);

      for (let answer of caseAnswers) {
        answer.isRight = true;
      }

      let userResults = {
        timeLeft: 120,
        answers: caseAnswers,
        attempts: 0
      };
      assert.equal(showResults(results.slice(), userResults), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
    });

    it(`Should show that you lost cause time is over`, () => {
      let results = [-3, 3, 6, 7, 8, 8, 9, 12, 14, 15, 16];
      let caseAnswers = testAnswers.slice(0, 5);

      for (let answer of caseAnswers) {
        answer.isRight = true;
      }

      let userResults = {
        timeLeft: 120,
        answers: caseAnswers,
        attempts: 0
      };
      assert.equal(showResults(results.slice(), userResults), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
    });
  });
});

describe(`Timer tests`, () => {
  it(`Timer after click () should reduce timeLeft by 1 (timeLeft -= 1)`, () => {
    let timer = new Timer(20);
    timer.click();
    assert.equal(timer.leftTime, 19);
  });

  it(`Timer should return exit message that time was over`, () => {
    let timer = new Timer(30);
    while (timer.leftTime !== 0) {
      timer.click();
    }
    assert.equal(timer.click(), `Время вышло!`);
  });
});


