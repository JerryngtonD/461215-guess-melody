import MistakesView from '../views/mistakes-view';

export default (mistakeCount) => {
  const mistakesView = new MistakesView(mistakeCount);

  return mistakesView;
};
