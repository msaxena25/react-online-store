import React from 'react';
import ProductList from './ProductList';
import ShoppingHeader from './ShoppingHeader';
import './Shopping.css';
import { useSelector } from 'react-redux';

const ShoppingDashboard = (props) => {
console.log('props :', props);
  const products = useSelector((state) => state.products.productAllItems);
  return (
    <>
      <ShoppingHeader {...props}></ShoppingHeader>
      <ProductList products={products}></ProductList>
    </>
  );
};

export default ShoppingDashboard;
