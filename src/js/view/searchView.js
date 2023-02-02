import View from './View';
import icons from 'url:../../img/icons.svg';

class searchView {
  #parentEl = document.querySelector('.search');
  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clear();
    return query;
  }
  #clear() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
  addhandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
