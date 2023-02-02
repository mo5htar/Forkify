import icons from 'url:../../img/icons.svg';
import View from './View';
class PageView extends View {
  _parentEl = document.querySelector('.pagination');

  addhandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn);
      const goto = +btn.dataset.goto;

      handler(goto);
    });
  }
  _generatMarkUp() {
    const numOfPage = Math.ceil(
      this._data.result.length / this._data.NumResPerPage
    );
    const curPage = this._data.page;
    console.log(curPage);
    if (curPage === 1 && numOfPage > 1) {
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
      </button>
      `;
    }

    if (curPage === numOfPage && numOfPage > 1) {
      return `
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>page ${curPage - 1}</span>
          </button>
          `;
    }
    if (curPage < numOfPage && curPage > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>page ${curPage - 1}</span>
    </button>
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
      </button>
      `;
    }
  }
}
export default new PageView();
