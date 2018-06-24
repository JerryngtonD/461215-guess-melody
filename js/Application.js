import getWelcomeView from './controllers/welcome';
import {GameScreen} from './GameScreen';
import state from './data/game-state';
import showScreen from './show-screen';

const gameScreen = new GameScreen(state);

export default class Application {

  static showWelcome() {
    gameScreen.initializeGame();
    const welcome = getWelcomeView(gameScreen.onGetNextLevel);
    showScreen(welcome.element);
  }
}
