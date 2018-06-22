import ResultView from '../views/result-view';
import showScreen from '../show-screen';
import getWelcomeScreen from './welcome';
import {gameScreen} from '../state';


export default (data) => {
  const resultView = new ResultView(data);
  resultView.onClick = () => {
    showScreen(getWelcomeScreen(gameScreen.onGetNextLevel()).element);
  };

  return resultView;
};
