import {Game} from './data/game';
const TIME_LIMIT = 300;
export const LIFE_COUNT = 3;
export const MAX_ANSWERS = 10;
const MISTAKE_POINT = -2;
const QUICK_ANSWER_POINT = 2;
const NORMAL_ANSWER_POINT = 1;

export const getPoints = ({isRight, time}) => {
  if (!isRight) {
    return MISTAKE_POINT;
  } else if (time < Game.QUICK_ANSWER_TIME) {
    return QUICK_ANSWER_POINT;
  }

  return NORMAL_ANSWER_POINT;
};

export const calculateResult = (answers, remainNotes = 0) => {
  if (!Array.isArray(answers) || answers.length !== MAX_ANSWERS || remainNotes === 0) {
    return -1;
  }

  const totalTime = answers.reduce((res, answer) => {

    return res + answer.time;
  }, 0);

  if (totalTime > TIME_LIMIT) {
    return -1;
  }

  return (answers || []).reduce((res, answer) => res + getPoints(answer), 0);
};
