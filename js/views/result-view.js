import AbstracktView from './abstract-view';

export default class ResultView extends AbstracktView {
  constructor(data) {
    super();
    this._mistakes = data.mistakes;
    this._scores = data.scores;
    this._fastScores = data.fastScores;
    this._comparison = data.comparison;
    this._min = data.min;
    this._sec = data.sec;
  }

  get template() {
    return `
      <section class="main main--result">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    
        <h2 class="title">Вы настоящий меломан!</h2>
        <div class="main-stat">За&nbsp;${this._min}&nbsp;минуты и ${this._sec}&nbsp;секунд
          <br>вы&nbsp;набрали ${this._scores} баллов (${this._fastScores} быстрых)
          <br>совершив ${this._mistakes} ошибки</div>
        <span class="main-comparison">${this._comparison}</span>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>`;
  }

  onClick() {
    throw new Error(`You need to create handler first!`);
  }

  bind() {
    const replayBtn = this.element.querySelector(`.main-replay`);
    replayBtn.addEventListener(`click`, this.onClick);
  }
}
