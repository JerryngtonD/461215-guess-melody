import {getElementFromTemplate} from '../utils';

export default class AbstracktView {
  constructor() {
    if (new.target === AbstracktView) {
      throw new Error(`Can't initiate AbstractView, only concrete one`);
    }
  }

  get template() {
    throw new Error(`Template is required`);
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
  }
}
