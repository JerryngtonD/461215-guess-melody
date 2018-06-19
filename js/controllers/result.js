import ResultView from '../views/result-view';
import showScreen from '../show-screen';
import getWelcomeScreen from './welcome';
import {onGetNextLevel} from '../main';

export default (data) => {
  const resultView = new ResultView(data);
  resultView.onClick = () => {
    showScreen(getWelcomeScreen(onGetNextLevel).element);
  };

  return resultView;
};
