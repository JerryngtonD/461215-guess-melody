'use strict';

const LEFT_ARROW_CODE = 37;
const RIGHT_ARROW_CODE = 39;

const template = document.querySelector(`#templates`).content;
const mainFrames = template.querySelectorAll(`.main`);
const btnArrows = template.querySelector(`.arrows__wrap`);
const leftButton = template.querySelectorAll(`.arrows__btn`)[0];
const rightButton = template.querySelectorAll(`.arrows__btn`)[1];
const appContainer = document.querySelector(`.app`);
const entryPoint = document.querySelector(`.app .main`);

appContainer.appendChild(btnArrows);
let indexFramePointer = 0;

let insertFrameToApp = (number) => {
  const takenFrame = mainFrames[number];
  if (entryPoint.firstChild) {
    entryPoint.replaceChild(takenFrame, entryPoint.firstChild);
  }
  entryPoint.appendChild(takenFrame);
};

let changeCurrentFrame = (isDirectionLeft) => {
  if (isDirectionLeft === true) {
    if (indexFramePointer > 0) {
      --indexFramePointer;
      insertFrameToApp(indexFramePointer);
    }
  } else {
    if (indexFramePointer < mainFrames.length - 1) {
      ++indexFramePointer;
      insertFrameToApp(indexFramePointer);
    }
  }
};

insertFrameToApp(indexFramePointer);

document.addEventListener(`keydown`, (evt) => {
  if (evt.keyCode === LEFT_ARROW_CODE) {
    changeCurrentFrame(true);
  } else if (evt.keyCode === RIGHT_ARROW_CODE) {
    changeCurrentFrame(false);
  }
});

leftButton.addEventListener(`click`, () => {
  changeCurrentFrame(true);
});

rightButton.addEventListener(`click`, () => {
  changeCurrentFrame(false);
});


