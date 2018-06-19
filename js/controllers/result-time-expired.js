import ResultTimeExpiredView from '../views/result-time-expired-view';
import showScreen from '../show-screen';
import getWelcomeScreen from './welcome';
import {onGetNextLevel} from '../main';

export default () => {
  const resultTimeExpiredView = new ResultTimeExpiredView();
  resultTimeExpiredView.onClick = () => {
    showScreen(getWelcomeScreen(onGetNextLevel).element);
  };

  return resultTimeExpiredView;
};
