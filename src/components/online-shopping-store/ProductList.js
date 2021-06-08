import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, CardTitle, CardText, Row, Col, Input, CardImg } from 'reactstrap';
import { ADD_TO_CART, UPDATE_QUANTITY } from './../../redux/product-action-types';

const ProductList = (props) => {
console.log('props :', props);

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
    const item = { ...product, quantity: productQuantities[product.id] ? productQuantities[product.id] : 1 };
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  /**
   * Update Quantity in local variable state productQuantities if item is not in cart (this will be added once clicked on add to cart)
   * Dispatch UPDATE_QUANTITY action if item is in cart to update quantity
   */
  const onQuantityChange = (e, product) => {
    const p = { ...product, quantity: Number(e.target.value) };
    const findItem = cartProducts.find((item) => item.id === product.id);
    if (findItem) {
      dispatch({ type: UPDATE_QUANTITY, payload: p });
    } else {
      updateQuantity(product.id, Number(e.target.value));
    }
  };

  // update quantity value in local object productQuantities
  const updateQuantity = (productId, value) => {
    const pq = { ...productQuantities };
    pq[productId] = value;
    setProductQuantities(pq);
  };

  const addToCartButton = (product) => {
    return cartProducts.find((item) => item.id === product.id) ? (
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
  const getQuantValue = (productId) => {
    const findItem = cartProducts.find((item) => item.id === productId);
    return findItem ? findItem.quantity : productQuantities[productId] ? productQuantities[productId] : '';
  };

  return (
    <Row>
      {props.products.map((product, index) => {
        return (
          <Col key={index} sm='4'>
            <Card body className='product-item-card'>
              <CardImg top width='50%' className="product-img"   src={product.image} alt='Card image cap' />
              <CardTitle tag='h5'> {product.title}</CardTitle>
              <CardText className='price'>$ {product.price}</CardText>
              <CardText style={styles.qty}>
                <span>Qty: </span>
                <Input
                  value={getQuantValue(product.id)}
                  style={styles.qtyField}
                  type='number'
                  min='1'
                  onChange={($event) => onQuantityChange($event, product)}
                />
              </CardText>
              {/* <CardText>{product.description}</CardText> */}
              {addToCartButton(product)}
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default ProductList;
