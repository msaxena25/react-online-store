import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, CardTitle, CardText, Row, Col, Input } from 'reactstrap';
import { ADD_TO_CART, UPDATE_QUANTITY } from './../../redux/product-action-types';

const ProductList = (props) => {
  const [items, setItems] = useState(props.products);

  // local state to save quantity of those product that are not added still in carts
  const [productQuantities, setProductQuantities] = useState({});

  const cartProducts = useSelector((state) => state.products.cartProducts);

  const dispatch = useDispatch();

  const styles = {
    mobileIcon: {
      color: 'green',
    },
    qty: { width: '40%', display: 'inline-flex' },
    qtyField: {
      marginLeft: '10px',
    },
  };

  /**
   * Get Quantity value 1 if User directly click on Add to cart button
   * If User increment quantity first then click on add to cart - in this case take quantity value from productQuantities object
   * dispatch ADD_TO_CART to adding item in redux state
   */
  const onAddToCartClick = (product) => {
    const item = { ...product, quantity: productQuantities[product.name] ? productQuantities[product.name] : 1 };
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  /**
   * Update Quantity in local variable state productQuantities if item is not in cart (this will be added once clicked on add to cart)
   * Dispatch UPDATE_QUANTITY action if item is in cart to update quantity
   */
  const onQuantityChange = (e, product) => {
    const p = { ...product, quantity: Number(e.target.value) };
    const findItem = cartProducts.find((item) => item.name === product.name);
    if (findItem) {
      dispatch({ type: UPDATE_QUANTITY, payload: p });
    } else {
      updateQuantity(product.name, Number(e.target.value));
    }
  };

  // update quantity value in local object productQuantities
  const updateQuantity = (productName, value) => {
    const pq = { ...productQuantities };
    pq[productName] = value;
    setProductQuantities(pq);
  };

  const addToCartButton = (product) => {
    return cartProducts.find((item) => item.name === product.name) ? (
      <Button color='success'>Added</Button>
    ) : (
      <Button color='warning' onClick={() => onAddToCartClick(product)}>
        Add to Cart
      </Button>
    );
  };

  /**
   * Get product quantity from redux state cartProducts if item is in cart.
   * Get quantity from local variable productQuantities if item is not in cart.
   */
  const getQuantValue = (name) => {
    const findItem = cartProducts.find((item) => item.name === name);
    return findItem ? findItem.quantity : productQuantities[name] ? productQuantities[name] : '';
  };

  return (
    <Row>
      {items.map((product, index) => {
        return (
          <Col key={index} sm='3'>
            <Card body className='product-item-card'>
              <CardTitle tag='h5'> {product.name}</CardTitle>
              <CardText className='price'>₹ {product.price}</CardText>
              <CardText style={styles.qty}>
                <span>Qty: </span>
                <Input
                  value={getQuantValue(product.name)}
                  style={styles.qtyField}
                  type='number'
                  min='1'
                  onChange={($event) => onQuantityChange($event, product)}
                />
              </CardText>
              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
              {addToCartButton(product)}
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default ProductList;
