import { async } from 'regenerator-runtime';
import { API_URL, Res_Per_page, key } from './confg.js';
import { getJson, sendJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    NumResPerPage: Res_Per_page,
  },
  bookmarks: [],
};

export const LoadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}${id}`);
    // console.log(data.data);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const LoadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await getJson(`${API_URL}?search=${query}`);
    state.search.result = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearctPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.NumResPerPage;
  const end = page * state.search.NumResPerPage;
  return state.search.result.slice(start, end);
};

export const updataServing = function (newServing) {
  // console.log(newServing);
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
  });

  state.recipe.servings = newServing;
};

const presistBookmakr = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  presistBookmakr();
};

export const deleteBookMark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;
  presistBookmakr();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredients') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredients format:!)) Please use Correct format'
          );
        const [quantity, unit, describtion] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, describtion };
      });
  } catch (err) {
    console.log('nope');
  }
  const recipe = {
    title: newRecipe.title,
    publisher: newRecipe.publisher,
    sourceUrl: newRecipe.source_url,
    image: newRecipe.image_url,
    servings: +newRecipe.servings,
    cookingTime: +newRecipe.cooking_time,
    ingredients,
  };
  sendJSON(`${API_URL}key=${key}`, recipe);
};
