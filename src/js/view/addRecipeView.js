import icons from 'url:../../img/icons.svg';
import View from './View';
class addRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addhandlerShowWindow();
    this._addhandlerHideWindow();
  }
  toggleWindow() {
    this._window.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
  }
  _addhandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addhandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  addhandlerUpload(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      const data = [...new FormData(this)];
      const Arrdata = Object.fromEntries(data);

      handler(Arrdata);
    });
  }
  _generatMarkUp() {}
}
export default new addRecipeView();
