import getWelcomeView from './controllers/welcome';
import {GameScreen} from './GameScreen';
import state from './data/game-state';
import showScreen from './show-screen';
import SplashScreen from './splash/SplashScreen';
import getGenreScreen from './controllers/genre';
import getArtistScreen from './controllers/artist';
import {Game} from "./data/game";

const gameScreen = new GameScreen(state);
const delayLoadTime = 700;
export default class Application {

  static loadData() {
    const loaderScreen = new SplashScreen();
    loaderScreen.startLoading();

    return window.fetch(`https://es.dump.academy/guess-melody/questions`)
      .then((response) => {
        let questData = response.json();
        setTimeout(loaderScreen.stopLoading, delayLoadTime);
        return questData;
      })
      .then((questData) => {
        let transformedData = questData.map((quest) => {
          if (quest.type === `artist`) {
            let isRightArtist = null;
            let answersAdapted = quest.answers.map((answer) => {
              if (answer.isCorrect) {
                isRightArtist = answer.title;
              }
              return {
                isRight: answer.isCorrect,
                track: {
                  image: answer.image.url,
                  artist: answer.title
                }
              };
            });
            return {
              type: `levelArtist`,
              question: quest.question,
              track: {
                src: quest.src,
                artist: isRightArtist,
              },
              answers: answersAdapted
            };
          } else if (quest.type === `genre`) {
            let answerAdapted = quest.answers.map((answer) => {
              let isRight = false;
              if (answer.genre === quest.genre) {
                isRight = true;
              }
              return {
                isRight,
                track: {
                  src: answer.src
                }
              };
            });
            return {
              type: `levelGenre`,
              question: quest.question,
              answers: answerAdapted
            };
          }
          return true;
        });
        return transformedData;
      });
  }

  static startGame() {
    Application.loadData().then((levels) => levels)
      .then((levels) => {
        gameScreen.initializeGame();
        state.set({levels});
        const welcome = getWelcomeView(gameScreen.onGetNextLevel);
        showScreen(welcome.element);
      });
  }

  static tryAgain() {
    const {levels} = gameScreen.gameState.get();
    const level = levels[0];
    gameScreen.startTimer();
    let firstGameScreen = null;
    if (level.type === `levelGenre`) {
      firstGameScreen = getGenreScreen(level, gameScreen.gameState, gameScreen.onGetNextLevel, gameScreen.startTimer, gameScreen.stopTimer);
    } else {
      firstGameScreen = getArtistScreen(level, gameScreen.gameState, gameScreen.onGetNextLevel, gameScreen.startTimer, gameScreen.stopTimer);
    }
    showScreen(firstGameScreen.element);
  }
}
