import ResultAttemptExpiredView from '../views/result-attempt-expired-view';
import showScreen from '../show-screen';
import getWelcomeScreen from './welcome';
import {GameScreen} from './GameScreen';

export default () => {
  const resultAttemptExpiredView = new ResultAttemptExpiredView();
  resultAttemptExpiredView.onClick = () => {
    showScreen(getWelcomeScreen(new GameScreen().onGetNextLevel()).element);
  };

  return resultAttemptExpiredView;
};
