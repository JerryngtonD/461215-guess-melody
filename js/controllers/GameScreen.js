import showScreen from "../show-screen";
import Genre from "./genre";
import {Game, getRandomLevels} from "../data/game";
import Artist from "./artist";
import getResultScreen from "./result";
import getWelcomeScreen from "./welcome";
import {getComparison, getResults} from "../show-result";
import getResultAttemptExpiredScreen from "./result-attempt-expired";
import getResultTimeExpiredScreen from './result-time-expired';

export class GameScreen {
  constructor(gameModel) {
    this.model = gameModel;
    this.timer = null;
  }

  tick() {
    let currentTime = this.model.state.TOTAL_TIME;
    this.model.state({TOTAL_TIME: --currentTime});
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

    const {currentLevel, levels, userAnswers} = this.model.state;
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
          showScreen(new Genre(level, this.state).genreView);
          break;
        case Game.TYPES.ARTIST:
          showScreen(new Artist(level, this.state).artistView);
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
    this.model.state.clear();
    this.model.state({
      levels: getRandomLevels()
    });
  }

  startGame() {
    this.initializeGame();
    showScreen(getWelcomeScreen(this.onGetNextLevel()).element);
  }
}
