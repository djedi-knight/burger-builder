import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
      });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {
        error: true,
      });
    case actionTypes.ADD_INGREDIENT:
      const updatedAddIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      };
      const updatedAddIngredients = updateObject(state.ingredients, updatedAddIngredient);
      const updatedAddState = {
        ingredients: updatedAddIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
      return updateObject(state, updatedAddState);
    case actionTypes.REMOVE_INGREDIENT:
      const updatedRemoveIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
      };
      const updatedRemoveIngredients = updateObject(state.ingredients, updatedRemoveIngredient);
      const updatedRemoveState = {
        ingredients: updatedRemoveIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
      return updateObject(state, updatedRemoveState);
    default:
      return state;
  }
};

export default reducer;