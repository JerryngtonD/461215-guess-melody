import showScreen from './show-screen';
import getArtistScreen from './controllers/artist';
import getResultScreen from './controllers/result';
import getResultAttemptExpiredScreen from './controllers/result-attempt-expired';
import getResultTimeExpiredScreen from './controllers/result-time-expired';
import getGenreScreen from './controllers/genre';
import {getRandomLevels, Game} from './data/game';
import {getResults, getComparison} from './show-result';
import {randomInteger} from "./utils";


const ONE_SECOND = 1000;
const MIN_RANGE = 0;
const MAX_RANGE = 10000;
const APP_ID = randomInteger(MIN_RANGE, MAX_RANGE);


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
    this.timer = null;
    this.gameState.clear();
    this.gameState.set({
      levels: getRandomLevels()
    });
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
    userStatistic.id = randomInteger(MIN_RANGE, MAX_RANGE);

    this.stopTimer();
    this.initializeGame();

    this.uploadData(userStatistic)
      .then(() => {
        return this.loadData();
      })
      .then((userResults) => {
        const resultData = Object.assign({},
            userResult,
            {
              comparison: getComparison(userResults, userStatistic)
            }
        );
        showScreen(getResultScreen(resultData, this.onGetNextLevel).element);
      });
  }

  uploadData(data) {
    return window.fetch(`https://es.dump.academy/guess-melody/stats/${APP_ID}`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    })
      .then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
      });
  }

  loadData() {
    return window.fetch(`https://es.dump.academy/guess-melody/stats/${APP_ID}`)
      .then((data) => {
        return data.json();
      });
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

