export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems(data) {
    data.forEach(this._renderer);
  }

  setItem(element) {
    this._container.append(element);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
