import { combineReducers } from 'redux';

import productReducer from '../redux/reducers'; 

const rootReducer = combineReducers({ 
  products: productReducer
});

export default rootReducer;
