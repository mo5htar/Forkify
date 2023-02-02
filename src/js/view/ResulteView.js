import icons from 'url:../../img/icons.svg';
import View from './View';
class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _ErrorMessage = 'No Recipe for your query ! Please try again :)';

  _generatMarkUp() {
    return `
        ${this._data.map(this._GenerateMarkUpING).join('')}
    `;
  }
  _GenerateMarkUpING(ans) {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
    <a class="preview__link ${
      ans.id === id ? 'preview__link--active' : ''
    }" href="#${ans.id}">
      <figure class="preview__fig">
        <img src="${ans.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${ans.title}</h4>
        <p class="preview__publisher">${ans.publisher}</p>
        <div class="preview__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>;
    `;
  }
}
export default new ResultView();
