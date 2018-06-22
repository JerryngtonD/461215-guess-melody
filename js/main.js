import showScreen from './show-screen';
import getWelcomeScreen from './controllers/welcome';
import getArtistScreen from './controllers/artist';
import getResultScreen from './controllers/result';
import getResultAttemptExpiredScreen from './controllers/result-attempt-expired';
import getResultTimeExpiredScreen from './controllers/result-time-expired';
import getGenreScreen from './controllers/genre';
import state from './data/game-state';
import {getRandomLevels, Game} from './data/game';
import {getResults, getComparison} from './show-result';
export const statistics = [];



const tick = () => {
  let currentTime = state.get().TOTAL_TIME;
  state.set({TOTAL_TIME: --currentTime});
};

let timer;
const startTimer = () => {
  timer = setTimeout(() => {
    if (state.get().TOTAL_TIME === 0) {
      stopTimer();
      showScreen(getResultTimeExpiredScreen().element);
      initializeGame();
      return;
    }
    tick();
    updateTimeElems(state.get().TOTAL_TIME);
    startTimer();
  }, 1000);
};

const stopTimer = () => {
  clearTimeout(timer);
};

const updateTimeElems = (currentTime) => {
  const timeRoot = document.querySelector(`.timer-value`);
  const mins = timeRoot.querySelector(`.timer-value-mins`);
  const secs = timeRoot.querySelector(`.timer-value-secs`);

  let currentMins = Math.trunc(currentTime / 60);
  let currentSecs = currentTime % 60;

  if (currentSecs.toString().length !== 1) {
    secs.innerHTML = currentSecs;
  } else {
    secs.innerHTML = `0` + currentSecs;
  }
  mins.innerHTML = `0` + currentMins;
};


export const onGetNextLevel = () => {

  const {currentLevel, levels, userAnswers} = state.get();
  const userResult = getResults(userAnswers, statistics);

  if (userResult.mistakes === Game.MISTAKES_COUNT) {
    stopTimer();
    showScreen(getResultAttemptExpiredScreen().element);
    initializeGame();
    return;
  }

  // TODO show result time expired


  const level = currentLevel < Game.TOTAL_QUESTIONS ? levels[currentLevel] : false;
  if (level) {

    state.set({answerTimeBegin: state.get().TOTAL_TIME});
    let currentTime = state.get().TOTAL_TIME;

    stopTimer();
    startTimer(currentTime);
    state.set({currentLevel: currentLevel + 1, mistakes: userResult.mistakes});


    switch (level.type) {
      case Game.TYPES.GENRE:
        showScreen(getGenreScreen(level, state).element);
        break;
      case Game.TYPES.ARTIST:
        showScreen(getArtistScreen(level, state).element);
        break;
    }
    return;
  }

  const userStatistic = _getUserStatistics(userResult);
  const resultData = Object.assign({},
      userResult,
      {
        comparison: getComparison(statistics, userStatistic)
      }
  );
  statistics.push(userStatistic);
  showScreen(getResultScreen(resultData).element);
  initializeGame();
};

const _getUserStatistics = ({time, scores, mistakes}) => {
  const userStatistic = {
    scores,
    remainNotes: Game.MISTAKES_COUNT - mistakes,
    remainTimes: Game.TOTAL_TIME - time
  };

  return userStatistic;
};

export const initializeGame = () => {
  state.clear();
  state.set({
    levels: getRandomLevels()
  });
};


const onContentLoaded = () => {
  initializeGame();
  showScreen(getWelcomeScreen(onGetNextLevel).element);
};

document.addEventListener(`DOMContentLoaded`, onContentLoaded);
