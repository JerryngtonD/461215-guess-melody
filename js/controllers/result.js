import ResultView from '../views/result-view';
import showScreen from '../show-screen';
import getWelcomeScreen from './welcome';
import {dataModel} from '../dataModel';

export default (data) => {
  const resultView = new ResultView(data);
  resultView.onClick = () => {
    showScreen(getWelcomeScreen(dataModel.onGetNextLevel()).element);
  };

  return resultView;
};
