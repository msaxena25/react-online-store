import { ADD_TO_CART, GET_PRODUCT_LIST, UPDATE_QUANTITY } from './product-action-types';

const productApiURL = 'https://fakestoreapi.com/products';
export function fetchProducts() {
  return (dispatch) => {
    dispatch(getProducts());
    return fetch(productApiURL)
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchProductsSuccess(json));
        return json;
      })
      .catch((error) => dispatch(fetchProductsFailure(error)));
  };
}
// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
export const getProducts = () => {
  return {
    type: GET_PRODUCT_LIST,
  };
};

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const updateQuantity = (product) => {
    return {
        type: UPDATE_QUANTITY,
        payload: product
    }
}
