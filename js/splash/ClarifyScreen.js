import AbstracktView from '../views/abstract-view';
import {getElementFromTemplate} from '../utils';
import Application from '../Application';


export default class ClarifyScreen extends AbstracktView {
  constructor(continueGame) {
    super();
    this.continueTimer = continueGame;
  }

  get template() {
    return `
 <div class="modal" style="z-index: 1000">
  <div class="header">
    Хорошенько подумай, игра будет потеряна!
  </div>
  <div class="content">
    Ты уверен в том, что хочешь выйти, друг ?
  </div>
  <div class="actions">
    <a class="success"> Да, хочу закончить игру</a>
    <a class="escape"> Нет, погнали дальше</a>
  </div>
  <div class="loader-bar">
    <div class="bar"></div>
  </div>
</div>`;
  }

  showClarify() {
    const clarifyElement = this.element;
    const layerElement = document.querySelector(`.main`);
    layerElement.appendChild(clarifyElement);
  }

  cancelClarify() {
    this.continueTimer();
    const layerLoader = document.querySelector(`.main`);
    const loaderElement = layerLoader.querySelector(`.modal`);
    layerLoader.removeChild(loaderElement);
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }


  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {
    const goToWelcomeButton = this.element.querySelector(`.success`);
    const continueButton = this.element.querySelector(`.escape`);

    goToWelcomeButton.addEventListener(`click`, () => {
      Application.startGame();
    });

    continueButton.addEventListener(`click`, () => {
      this.cancelClarify();
    });
  }

}

