import ResultAttemptExpiredView from '../views/result-attempt-expired-view';
import Application from '../Application';


export default () => {
  const resultAttemptExpiredView = new ResultAttemptExpiredView();
  resultAttemptExpiredView.onClick = () => {
    Application.startGame();
  };

  return resultAttemptExpiredView;
};
