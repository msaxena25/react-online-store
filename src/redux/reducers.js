import { ADD_TO_CART, GET_CART_PRODUCTS, GET_PRODUCT_LIST, REMOVE_PRODUCT, UPDATE_QUANTITY } from './product-action-types';

const initialState = {
  productAllItems: [
    { name: 'Samsung phone Model 1', price: 10000 },
    { name: 'MI phone Model 1', price: 8000 },
    { name: 'Apple phone Model 1', price: 50000 },
    { name: 'Nokia phone Model 1', price: 15000 },
    { name: 'Samsung phone Model A2', price: 10000 },
    { name: 'MI phone Model A3', price: 8000 },
    { name: 'Apple phone Model A4', price: 50000 },
    { name: 'Nokia phone Model S3', price: 15000 },
  ],
  cartProducts: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_LIST:
      return state.productAllItems;
    case ADD_TO_CART:
      const s =  getState(state);
      s.cartProducts.push(action.payload);
      return s;
    case GET_CART_PRODUCTS:
      return state.cartProducts;
    case REMOVE_PRODUCT:
      const s1 = { ...state };
      const product = s1.cartProducts.find((item) => item.name === action.payload);
      if (product) {
        s1.cartProducts = s1.cartProducts.filter((items) => items.name !== action.payload);
        return s1;
      }
    case UPDATE_QUANTITY:
      return updateQuantityReducer(state, action);
    default:
      return state;
  }
};

const updateQuantityReducer = (state, action) => {
  const s = getState(state);
  if(s.cartProducts.length) {
    const index = s.cartProducts.findIndex(item => item.name === action.payload.name);
    if(index > -1) {
      s.cartProducts[index].quantity =  action.payload.quantity;
    
    }
  }
  return s;
}

const getState = (state) => {
  return {
    ...state,
    cartProducts: [...state.cartProducts]
  }
}

export default productReducer;
