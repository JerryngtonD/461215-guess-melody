export const createElementFromString = (htmlString) => {
  let entrydDiv = document.createElement(`div`);
  entrydDiv.innerHTML = htmlString.trim();
  return entrydDiv.firstChild;
};

const mainElement = document.querySelector(`.app .main`);

export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

export const backToTop = (hostSelector, originSelector, frame) => {
  let playAgainButton = hostSelector.querySelector(`.${originSelector}`);
  playAgainButton.addEventListener(`click`, ()=> {
    changeScreen(frame);
  });
};
