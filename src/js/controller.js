import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import View from './view/View.js';
import ResulteView from './view/ResulteView.js';
import pageView from './view/pageView.js';
import bookmarkView from './view/bookmarkView.js';
import addRecipeView from './view/addRecipeView';
const contralRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    //console.log(id);
    recipeView.renderSpinner();

    //updata result view makrked

    ResulteView.update(model.getSearctPage());
    bookmarkView.update(model.state.bookmarks);

    // load recipe form model
    await model.LoadRecipe(id);

    //render to view
    // console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    // recipeView.renderError();
  }
};

const contralSeacrchResult = async function () {
  try {
    //get query;
    ResulteView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;
    //console.log(query);
    //load search Result
    await model.LoadSearchResult(query);

    //  console.log(model.state.search.result);
    //Render result
    ResulteView.render(model.getSearctPage());

    //render init paination

    pageView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const contralPageResult = function (goTo) {
  ResulteView.render(model.getSearctPage(goTo));

  //render init paination

  pageView.render(model.state.search);
};

const contralUpdataServing = function (newServing) {
  // console.log(newServing);
  model.updataServing(newServing);
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const contralAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookMark(model.state.recipe.id);
  //console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmarks);
};

const contralbookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};

const contralAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);
  try {
    await model.LoadRecipe(newRecipe);
  } catch (err) {
    addRecipeView.renderError();
  }
};

const init = function () {
  bookmarkView.addhandelerBookmark(contralbookmark);
  recipeView.addhandlerRender(contralRecipe);
  recipeView.addhadndlerUpdata(contralUpdataServing);
  recipeView.addhadndlerBookmark(contralAddBookmark);
  searchView.addhandlerSearch(contralSeacrchResult);
  pageView.addhandler(contralPageResult);
  addRecipeView.addhandlerUpload(contralAddRecipe);
};
init();
