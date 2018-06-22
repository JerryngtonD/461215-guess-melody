import ResultTimeExpiredView from '../views/result-time-expired-view';
import showScreen from '../show-screen';
import getWelcomeScreen from './welcome';
import {dataModel} from '../dataModel';

export default () => {
  const resultTimeExpiredView = new ResultTimeExpiredView();
  resultTimeExpiredView.onClick = () => {
    showScreen(getWelcomeScreen(dataModel.onGetNextLevel()).element);
  };

  return resultTimeExpiredView;
};
