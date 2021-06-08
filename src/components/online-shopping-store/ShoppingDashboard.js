import React, { useEffect } from 'react';
import ProductList from './ProductList';
import ShoppingHeader from './ShoppingHeader';
import './Shopping.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/action';

const ShoppingDashboard = (props) => {
  const products = useSelector((state) => state.products.productAllItems);
  console.log('products :', products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      <ShoppingHeader {...props}></ShoppingHeader>
      {products && products.length > 0 && <ProductList products={products}></ProductList>}
    </>
  );
};

export default ShoppingDashboard;
