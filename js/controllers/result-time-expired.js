import ResultTimeExpiredView from '../views/result-time-expired-view';
import showScreen from '../show-screen';
import getWelcomeScreen from './welcome';
import {gameScreen} from '../state';

export default () => {
  const resultTimeExpiredView = new ResultTimeExpiredView();
  resultTimeExpiredView.onClick = () => {
    showScreen(getWelcomeScreen(gameScreen.onGetNextLevel()).element);
  };

  return resultTimeExpiredView;
};
