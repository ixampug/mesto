export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector('.elements');
  }

  // renderItem(items) {
  //   items.forEach((item) => {
  //     this._renderer(item);
  //   });
  // }

  // addItem(element) {
  //   this._container.prepend(element);
  // }
  renderItem(item) {
    const cardElement = this._renderer(item);
    this.addItem(cardElement);
  }

  
  addItem(element) {
    this._container.append(element);
  }
}
