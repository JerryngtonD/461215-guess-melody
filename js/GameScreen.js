import showScreen from './show-screen';
import getArtistScreen from './controllers/artist';
import getResultScreen from './controllers/result';
import getResultAttemptExpiredScreen from './controllers/result-attempt-expired';
import getResultTimeExpiredScreen from './controllers/result-time-expired';
import getGenreScreen from './controllers/genre';
import {getRandomLevels, Game} from './data/game';
import {getResults, getComparison} from './show-result';


const ONE_SECOND = 1000;

export class GameScreen {
  constructor(gameState) {
    this.beginState = gameState;
    this.gameState = gameState;
    this.gameState.clear();
    this.timer = null;
    this.statistics = [];
    this.onGetNextLevel = this.onGetNextLevel.bind(this);
  }

  initializeGame() {
    this.stopTimer();
    this.gameState.clear();
    this.gameState.set({
      levels: getRandomLevels()
    });
    this.timer = null;
    this.onGetNextLevel = this.onGetNextLevel.bind(this);
  }

  tick() {
    let currentTime = this.gameState.get().TOTAL_TIME;
    this.gameState.set({TOTAL_TIME: --currentTime});
  }

  startTimer() {
    this.timer = setTimeout(() => {
      if (this.gameState.get().TOTAL_TIME === 0) {
        this.stopTimer();
        showScreen(getResultTimeExpiredScreen().element);
        this.initializeGame();
        return;
      }
      this.tick();
      this.updateTimeElems(this.gameState.get().TOTAL_TIME);
      this.startTimer();
    }, ONE_SECOND);
  }


  stopTimer() {
    clearTimeout(this.timer);
  }


  updateTimeElems(currentTime) {
    const timeRoot = document.querySelector(`.timer-value`);
    if (timeRoot) {
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
    }
  }

  onGetNextLevel() {
    const {currentLevel, levels, userAnswers} = this.gameState.get();
    const userResult = getResults(userAnswers, this.statistics);

    if (userResult.mistakes === Game.MISTAKES_COUNT) {
      this.stopTimer();
      this.initializeGame();
      showScreen(getResultAttemptExpiredScreen().element);
      return;
    }


    const level = currentLevel < Game.TOTAL_QUESTIONS ? levels[currentLevel] : false;
    if (level) {

      this.gameState.set({answerTimeBegin: this.gameState.get().TOTAL_TIME});
      let currentTime = this.gameState.get().TOTAL_TIME;

      this.stopTimer();
      this.startTimer(currentTime);
      this.gameState.set({currentLevel: currentLevel + 1, mistakes: userResult.mistakes});


      switch (level.type) {
        case Game.TYPES.GENRE:
          showScreen(getGenreScreen(level, this.gameState, this.onGetNextLevel).element);
          break;
        case Game.TYPES.ARTIST:
          showScreen(getArtistScreen(level, this.gameState, this.onGetNextLevel).element);
          break;
      }
      return;
    }

    const userStatistic = this._getUserStatistics(userResult);
    const resultData = Object.assign({},
        userResult,
        {
          comparison: getComparison(this.statistics, userStatistic)
        }
    );

    this.statistics.push(userStatistic);

    this.stopTimer();
    this.initializeGame();
    showScreen(getResultScreen(resultData, this.onGetNextLevel).element);
  }

  _getUserStatistics({time, scores, mistakes}) {
    const userStatistic = {
      scores,
      remainNotes: Game.MISTAKES_COUNT - mistakes,
      remainTimes: Game.TOTAL_TIME - time
    };

    return userStatistic;
  }
}

