export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach(item => {
      const cardElement = this._renderer(item);
    });
  }

  setItem(element) {
    this._container.append(element);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}