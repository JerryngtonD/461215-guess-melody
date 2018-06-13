export const userAnswers = [
  {
    singer: `Пелагея`,
    questionTime: 10,
    isRight: true
  },

  {
    choosenTracks: [0, 3],
    questionTime: 20,
    isRight: false
  },

  {
    singer: `Lorde`,
    questionTime: 130,
    isRight: false
  },

  {
    signer: `Краснознаменная дивизия имени моей бабушки`,
    questionTime: 20,
    isRight: false
  },

  {
    singer: `Ole`,
    questionTime: 40,
    isRight: false
  },

  {
    choosenTracks: [0, 3],
    questionTime: 130,
    isRight: false
  },

  {
    singer: `Rill`,
    questionTime: 10,
    isRight: true
  },

  {
    choosenTracks: [0, 1],
    questionTime: 28,
    isRight: true
  },

  {
    choosenTracks: [0],
    questionTime: 15,
    isRight: true
  },

  {
    choosenTracks: [3],
    questionTime: 45,
    isRight: false
  }
];


const checkIsRightAnswers = (answers) => {
  answers.every((answer) => {
    return (answer.questionTime > 30 && answer.isRight);
  });
};

export const getTotalScore = (answers) => {
  let state = {
    total: 0,
    isProcessed: false
  };

  if (answers.length < 10) {
    return -1;
  }

  if (checkIsRightAnswers(answers)) {
    return 10;
  }

  state.isProcessed = true;
  answers.forEach((answer) => {
    if (answer.isRight && answer.questionTime <= 30) {
      state.total += 2;
    } else if (answer.isRight && answer.questionTime > 30) {
      state.total += 1;
    } else {
      state.total -= 2;
    }
  });

  return state;
};

export const searchInsert = (nums, target) => {
  let start = 0;
  let end = nums.length - 1;
  let index = Math.floor((end - start) / 2) + start;

  if (target > nums[nums.length - 1]) {
    // The target is beyond the end of this array.
    index = nums.length;
  } else {
    while (start < end) {
      let value = nums[index];

      if (value === target) {
        let result = index; // if our target  is already in the array
        return result;
      } else if (target < value) {
        end = index;
      } else {
        start = index + 1;
      }

      index = Math.floor((end - start) / 2) + start;
    }
  }

  return index;
};

export const insertToPosition = (arr, position, item) => {
  arr.splice(position, 0, item);
};

export const showResults = (results, userResults) => {
  if (getTotalScore(userResults.answers).total > 0 && userResults.answers.length === 10 && userResults.timeLeft >= 0) {
    let userPoints = getTotalScore(userResults.answers).total;
    let positionToInsert = searchInsert(results, userPoints);
    insertToPosition(results, positionToInsert, userPoints);
    let playersCount = results.length;
    let winnerPlace = results.length - positionToInsert + 1;
    let worsePlayersPercent = Math.floor(positionToInsert * 100 / playersCount);

    return `Вы заняли ${winnerPlace} место из ${playersCount } игроков. Это лучше, чем у ${worsePlayersPercent}% игроков`;
  } else if (userResults.answers.length < 10 && userResults.timeLeft === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии!`;
  } else if (userResults.attempts === 0 && userResults.answers.length < 10) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }
  return `Something was wrong`;
};


export class Timer {
  constructor(time) {
    this.leftTime = time;
  }

  click() {
    if (this.leftTime !== 0) {
      this.leftTime -= 1;
    }
    return `Время вышло!`;
  }
}


