import ResultAttemptExpiredView from '../views/result-attempt-expired-view';
import showScreen from '../show-screen';
import getWelcomeScreen from './welcome';
import {gameScreen} from "../state";

export default () => {
  const resultAttemptExpiredView = new ResultAttemptExpiredView();
  resultAttemptExpiredView.onClick = () => {
    showScreen(getWelcomeScreen(gameScreen.onGetNextLevel()).element);
  };

  return resultAttemptExpiredView;
};
