import ResultAttemptExpiredView from '../views/result-attempt-expired-view';
import Application from '../application';


export default () => {
  const resultAttemptExpiredView = new ResultAttemptExpiredView();
  resultAttemptExpiredView.onClick = () => {
    Application.tryAgain();
  };

  return resultAttemptExpiredView;
};
