import ResultAttemptExpiredView from '../views/result-attempt-expired-view';
import showScreen from '../show-screen';
import getWelcomeScreen from './welcome';
import {onGetNextLevel} from '../main';

export default () => {
  const resultAttemptExpiredView = new ResultAttemptExpiredView();
  resultAttemptExpiredView.onClick = () => {
    showScreen(getWelcomeScreen(onGetNextLevel).element);
  };

  return resultAttemptExpiredView;
};
