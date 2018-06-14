const main = document.querySelector(`.main`);

const clearScreen = () => {
  main.innerHTML = ``;
};

export default (screenFragment) => {
  clearScreen();
  main.appendChild(screenFragment);
};

