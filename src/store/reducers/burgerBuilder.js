import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 0.0,
  error: false
}


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 2.7,
  bacon: 1.0
}


const reducer = (state = initialState, action) => {
  switch( action.type ) {
    case actionTypes.ADD_INGREDIENTS :
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
      break;
    case actionTypes.REMOVE_INGREDIENTS :
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
      break;
    case actionTypes.SET_INGREDIENTS :
      return {
        ...state,
        ingredients: action.ingredients,
        error: false
      }
      break;
    case actionTypes.FETCH_INGREDIENTS_FAILED :
      return {
        ...state,
        error: true
      }
      break;
    default:
      return state;
  }
}

export default reducer;
