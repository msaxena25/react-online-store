import {
  ADD_TO_CART,
  GET_PRODUCT_LIST,
  GET_PRODUCT_REQUEST_FAILURE,
  GET_PRODUCT_REQUEST_SUCCESS,
  SEARCH_PRODUCT,
  UPDATE_QUANTITY,
} from './product-action-types';

const productApiURL = 'https://fakestoreapi.com/products';
export function fetchProducts() {
  return (dispatch) => {
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

const fetchProductsFailure = (error) => {
  return {
    type: GET_PRODUCT_REQUEST_FAILURE,
    payload: error,
  };
};

const fetchProductsSuccess = (data) => {
  return {
    type: GET_PRODUCT_REQUEST_SUCCESS,
    payload: data,
  };
};

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
    payload: product,
  };
};

export const searchProduct = (searchInput) => {
  return {
    type: SEARCH_PRODUCT,
    payload: searchInput,
  };
};



