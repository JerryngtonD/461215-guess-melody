'use strict';

const LEFT_ARROW_CODE = 37;
const RIGHT_ARROW_CODE = 39;

const template = document.querySelector(`#templates`).content;
const mainFrames = template.querySelectorAll(`.main`);
const btnArrows = template.querySelector(`.arrows__wrap`)
const leftButton = template.querySelectorAll(`.arrows__btn`)[0];
const rightButton = template.querySelectorAll(`.arrows__btn`)[1];
const appContainer = document.querySelector(`.app`);
const entryPoint = document.querySelector(`.app .main`);

appContainer.appendChild(btnArrows);
let indexFramePointer = 0;

const moveDirection = {
  "TO_LEFT": `ON_LEFT`,
  "TO_RIGHT": `ON_RIGHT`,
};

let getFramePerNumber = (number) => mainFrames[number];

let insertFrameToApp = (number) => {
  const takenFrame = getFramePerNumber(number);
  if (entryPoint.firstChild) {
    entryPoint.replaceChild(takenFrame, entryPoint.firstChild);
  }
  entryPoint.appendChild(takenFrame);
};

let changeCurrentFrame = (direction) => {
  if (direction === moveDirection.TO_LEFT) {
    if (indexFramePointer > 0) {
      --indexFramePointer;
      insertFrameToApp(indexFramePointer);
    }
  } else if (direction === moveDirection.TO_RIGHT) {
    if (indexFramePointer < mainFrames.length - 1) {
      ++indexFramePointer;
      insertFrameToApp(indexFramePointer);
    }
  }
};

insertFrameToApp(indexFramePointer);

document.addEventListener(`keydown`, (evt) => {
  if (evt.keyCode === LEFT_ARROW_CODE) {
    changeCurrentFrame(moveDirection.TO_LEFT);
  } else if (evt.keyCode === RIGHT_ARROW_CODE) {
    changeCurrentFrame(moveDirection.TO_RIGHT);
  }
});

leftButton.addEventListener(`click`, () => {
  changeCurrentFrame(moveDirection.TO_LEFT);
});

rightButton.addEventListener(`click`, () => {
  changeCurrentFrame(moveDirection.TO_RIGHT);
});





