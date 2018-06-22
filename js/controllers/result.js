import ResultView from '../views/result-view';
import showScreen from '../show-screen';
import getWelcomeScreen from './welcome';
import {GameScreen} from './GameScreen';


export default (data) => {
  const resultView = new ResultView(data);
  resultView.onClick = () => {
    showScreen(getWelcomeScreen(new GameScreen().onGetNextLevel()).element);
  };

  return resultView;
};
