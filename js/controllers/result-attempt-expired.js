import ResultAttemptExpiredView from '../views/result-attempt-expired-view';
import showScreen from '../show-screen';
import getWelcomeScreen from './welcome';
import {dataModel} from '../dataModel';

export default () => {
  const resultAttemptExpiredView = new ResultAttemptExpiredView();
  resultAttemptExpiredView.onClick = () => {
    showScreen(getWelcomeScreen(dataModel.onGetNextLevel()).element);
  };

  return resultAttemptExpiredView;
};
