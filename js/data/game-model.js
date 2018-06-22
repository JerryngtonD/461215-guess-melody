import state from "./game-state";
import {getComparison, getResults} from "../show-result";
import getResultAttemptExpiredScreen from "../controllers/result-attempt-expired";
import getResultTimeExpiredScreen from '../controllers/result-time-expired';
import {Game, getRandomLevels, INITIAL_STATE} from "./game";
import getGenreScreen from "../controllers/genre";
import getArtistScreen from "../controllers/artist";
import getResultScreen from "../controllers/result";
import getWelcomeScreen from "../controllers/welcome";

export class GameModel {
  constructor() {
    this.state = Object.assign({}, INITIAL_STATE);
    this.timer = null;
    this.statistics = [];
  }

  get state() {
    return this.state;
  }

  set state(newState) {
    this.state = Object.assign({}, this.state, newState);
  }

  clear() {
    this.state = Object.assign({}, INITIAL_STATE);
  }

/*  tick() {
    let currentTime = this.state.get().TOTAL_TIME;
    this.state({TOTAL_TIME: --currentTime});
  }

  startTimer() {
    this.timer = setTimeout(() => {
      if (this.state.TOTAL_TIME === 0) {
        this.stopTimer();
        showScreen(getResultTimeExpiredScreen().element);
        this.initializeGame();
        return;
      }
      this.tick();
      this.updateTimeElems(this.state.TOTAL_TIME);
      this.startTimer();
    }, 1000);
  }

  stopTimer() {
    clearTimeout(this.timer);
  }

  updateTimeElems(currentTime) {
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
  }

  onGetNextLevel() {

    const {currentLevel, levels, userAnswers} = state.get();
    const userResult = getResults(userAnswers, this.statistics);

    if (userResult.mistakes === Game.MISTAKES_COUNT) {
      this.stopTimer();
      showScreen(getResultAttemptExpiredScreen().element);
      this.initializeGame();
      return;
    }

    const level = currentLevel < Game.TOTAL_QUESTIONS ? levels[currentLevel] : false;
    if (level) {

      this.state({answerTimeBegin: this.state.TOTAL_TIME});
      let currentTime = this.state.TOTAL_TIME;

      this.stopTimer();
      this.startTimer(currentTime);
      this.state({currentLevel: currentLevel + 1, mistakes: userResult.mistakes});


      switch (level.type) {
        case Game.TYPES.GENRE:
          showScreen(getGenreScreen(level, this.state).element);
          break;
        case Game.TYPES.ARTIST:
          showScreen(getArtistScreen(level, this.state).element);
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
    showScreen(getResultScreen(resultData).element);
    this.initializeGame();
  }

  _getUserStatistics({time, scores, mistakes}) {
    const userStatistic = {
      scores,
      remainNotes: Game.MISTAKES_COUNT - mistakes,
      remainTimes: Game.TOTAL_TIME - time
    };

    return userStatistic;
  }

  initializeGame() {
    this.state.clear();
    this.state({
      levels: getRandomLevels()
    });
  }

  startGame() {
    this.initializeGame();
    showScreen(getWelcomeScreen(this.onGetNextLevel()).element);
  }*/
}