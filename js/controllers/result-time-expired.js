import ResultTimeExpiredView from '../views/result-time-expired-view';
import Application from '../Application';


export default () => {
  const resultTimeExpiredView = new ResultTimeExpiredView();
  resultTimeExpiredView.onClick = () => {
    Application.tryAgain();
  };

  return resultTimeExpiredView;
};
