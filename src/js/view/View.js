import icons from 'url:../../img/icons.svg';
export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    //  console.log(this._data);
    const markUp = this._generatMarkUp();
    if (!this.render) return markUp;
    // console.log(markUp);
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }

  update(data) {
    this._data = data;
    //  console.log(this._data);
    const newMarkUp = this._generatMarkUp();
    const newDom = document.createRange().createContextualFragment(newMarkUp);
    const newEl = Array.from(newDom.querySelectorAll('*'));
    const curEl = Array.from(this._parentEl.querySelectorAll('*'));

    newEl.forEach((nel, i) => {
      const cur = curEl[i];

      if (!nel.isEqualNode(cur) && nel.firstChild?.nodeValue.trim() !== '') {
        curEl[i].texContent = nel.textContent;
      }

      if (!nel.isEqualNode(cur)) {
        Array.from(nel.attributes).forEach(attr => {
          curEl[i].setAttribute(attr.name, attr.value);
        });
      }
    });
  }
  renderSpinner() {
    const markUp = `
    <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
    </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }
  renderError(message = this._ErrorMessage) {
    const markUp = `
    <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
    </div>
  `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }
}
