import {getPoints} from './calculate-result';
import {Game} from './data/game';

export const getComparison = (statistics, result) => {
  const userResult = Object.assign({}, result, {currentUser: true});
  const all = [...statistics, userResult].sort((a, b) => b.scores - a.scores);
  const pos = all.findIndex((item) => item.currentUser) + 1;
  const persent = Math.round(((all.length - pos) / all.length) * 100);

  return `Вы заняли ${pos}-ое место из ${all.length}. Это лучше чем у ${persent}% игроков.`;
};


export const getResults = (userAnswers) => {
  const {time, mistakes, fastScores, scores} = userAnswers.reduce((res, answer) => {
    const answerScores = getPoints(answer) || 0;
    if (!answer.isRight) {
      res.mistakes++;
    }

    if (answer.time < Game.QUICK_ANSWER_TIME && answer.isRight) {
      res.fastScores += answerScores;
    }

    res.time += answer.time;
    res.scores += answerScores;

    return res;
  }, {time: 0, mistakes: 0, fastScores: 0, scores: 0});

  return {
    min: Math.trunc(time / 60),
    sec: Math.trunc(time - Math.trunc(time / 60) * 60),
    time,
    mistakes,
    scores,
    fastScores
  };
};
