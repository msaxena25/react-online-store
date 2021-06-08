import {
  ADD_TO_CART,
  GET_CART_PRODUCTS,
  GET_PRODUCT_LIST,
  GET_PRODUCT_REQUEST_FAILURE,
  GET_PRODUCT_REQUEST_SUCCESS,
  REMOVE_PRODUCT,
  SEARCH_PRODUCT,
  UPDATE_QUANTITY,
} from './product-action-types';

const initialState = {
  productAllItems: [
    // { name: 'Samsung phone Model 1', price: 10000 },
    // { name: 'MI phone Model 1', price: 8000 },
    // { name: 'Apple phone Model 1', price: 50000 },
    // { name: 'Nokia phone Model 1', price: 15000 },
    // { name: 'Samsung phone Model A2', price: 10000 },
    // { name: 'MI phone Model A3', price: 8000 },
    // { name: 'Apple phone Model A4', price: 50000 },
    // { name: 'Nokia phone Model S3', price: 15000 },
  ],
  cartProducts: [],
  error: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_REQUEST_SUCCESS:
      const s = getState(state);
      s.productAllItems = action.payload;
      return s;
    case GET_PRODUCT_REQUEST_FAILURE:
      const s3 = getState(state);
      s3.error = action.payload;
      return s3;
    case GET_PRODUCT_LIST:
      return state.productAllItems;
    case ADD_TO_CART:
      const s4 = getState(state);
      s4.cartProducts.push(action.payload);
      return s4;
    case GET_CART_PRODUCTS:
      return state.cartProducts;
    case REMOVE_PRODUCT:
      return removeProductReducer(state, action);
    case UPDATE_QUANTITY:
      return updateQuantityReducer(state, action);
    case SEARCH_PRODUCT:
      return searchReducer(state, action);
    default:
      return state;
  }
};

const searchReducer = (state, action) => {
  const s = getState(state);
  console.log('s :', s);
  s.productAllItems = s.productAllItems.filter((item) => item.title.toLowerCase().trim()
  .indexOf(action.payload.toLowerCase().trim()) > -1);
  return s;
};

const removeProductReducer = (state, action) => {
  const s1 = { ...state };
  const product = s1.cartProducts.find((item) => item.id === action.payload);
  if (product) {
    s1.cartProducts = s1.cartProducts.filter((items) => items.id !== action.payload);
  }
  return s1;
};

const updateQuantityReducer = (state, action) => {
  const s = getState(state);
  if (s.cartProducts.length) {
    const index = s.cartProducts.findIndex((item) => item.id === action.payload.id);
    if (index > -1) {
      s.cartProducts[index].quantity = action.payload.quantity;
    }
  }
  return s;
};

const getState = (state) => {
  return {
    ...state,
    productAllItems: [...state.productAllItems],
    cartProducts: [...state.cartProducts],
  };
};

export default productReducer;
