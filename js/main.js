import showScreen from './show-screen';
import getWelcomeScreen from './templates/welcome';
import getArtistScreen from './templates/artist';
import getResultScreen from './templates/result';
import getResultAttemptExpiredScreen from './templates/result-attempt-expired';
// import getResultTimeExpired from './templates/result-time-expired';
import getGenreScreen from './templates/genre';
import state from './data/game-state';
import {getRandomLevels, Game} from './data/game';
import {getResults, getComparison} from './show-result';
export const statistics = [];

export const onGetNextLevel = () => {
  const {currentLevel, levels, userAnswers} = state.get();
  const userResult = getResults(userAnswers, statistics);

  if (userResult.mistakes === Game.MISTAKES_COUNT) {
    showScreen(getResultAttemptExpiredScreen());
    initializeGame();
    return;
  }

  // TODO show result time expired
  const level = currentLevel < Game.TOTAL_QUESTIONS ? levels[currentLevel] : false;
  if (level) {
    state.set({currentLevel: currentLevel + 1, mistakes: userResult.mistakes});

    switch (level.type) {
      case Game.TYPES.GENRE:
        showScreen(getGenreScreen(level, state));
        break;
      case Game.TYPES.ARTIST:
        showScreen(getArtistScreen(level, state));
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
  showScreen(getResultScreen(resultData));
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
  showScreen(getWelcomeScreen(onGetNextLevel));
};

document.addEventListener(`DOMContentLoaded`, onContentLoaded);
