import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardImg, CardBody, CardTitle, Button, Row, Col, Input } from 'reactstrap';
import OrderSumSummary from './OrderSumSummary';
import { REMOVE_PRODUCT, UPDATE_QUANTITY } from './../../redux/product-action-types';
import ShippingPaymentAndCouponSection from './ShippingPaymentAndCouponSection';

const CheckoutPage = (props) => {
  const productsInCart = useSelector((state) => state.products.cartProducts);
  const [totalItemPrice, setTotalItemPrice] = useState('');
  const [deliveryCharge, setDeliveryCharge] = useState('60.00'); // fixed
  const [showQuantityInputs, setShowQuantityInputs] = useState({});

  useEffect(() => {
    const priceArr = productsInCart.map((item) => item.price * item.quantity);
    if (priceArr.length) {
      const totalPrice = priceArr.reduce((sum, value) => sum + value);
      setTotalItemPrice(totalPrice.toFixed(2));
    }
  }, [productsInCart]);

  const dispatch = useDispatch();

  const goBackToProductPage = () => {
    props.history.push('/');
  };

  const onRemove = (e, item) => {
    dispatch({ type: REMOVE_PRODUCT, payload: item.name });
  };

  const showQuantityInputField = (item, isShow) => {
    setShowQuantityInputs({ [item.name]: isShow });
  };

  const onQuantityChange = (e, product) => {
    const p = { ...product, quantity: Number(e.target.value) };
    dispatch({ type: UPDATE_QUANTITY, payload: p });
  };

  return (
    <>
      <Row>
        <Col sm={10}>
          <h4>Review Your Order</h4>
          <p>
            By placing your order, you agree to online shop's <a href=''> privacy policy </a>and <a href=''>conditions.</a>
          </p>
        </Col>
        <Col>
          <div style={{ marginTop: '20px' }}>
            <Button color='warning' onClick={goBackToProductPage}>
              Shop More
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col sm={9}>
          <ShippingPaymentAndCouponSection></ShippingPaymentAndCouponSection>

          <Card style={{ marginTop: '20px' }}>
            <CardBody>
              <div>
                {productsInCart.map((item, index) => {
                  return (
                    <div key={index}>
                      <div>
                        <h6>{item.name}</h6>
                        <div>
                          <Row>
                            <Col>
                              <div>
                                Price: <span className='price'>₹ {item.price} </span>
                              </div>
                              <div className='display-inline-flex'>
                                Quantity:
                                {showQuantityInputs[item.name] ? (
                                  <div className='display-inline-flex pad-left-10'>
                                    <Input
                                      type='number'
                                      className="quant-field"
                                      value={item.quantity}
                                      min='1'
                                      onChange={($event) => onQuantityChange($event, item)}
                                    ></Input>
                                    <a className='link pad-left-10' onClick={() => showQuantityInputField(item, false)}>
                                      Done
                                    </a>
                                  </div>
                                ) : (
                                  <div className='display-inline-flex pad-left-10'>
                                    <span className='quantity'>{item.quantity}</span>{' '}
                                    <a className='link pad-left-10' onClick={() => showQuantityInputField(item, true)}>
                                      change
                                    </a>
                                  </div>
                                )}
                              </div>
                            </Col>
                            <Col>
                              Total Item Price:{' '}
                              <span>
                                {item.quantity} * {item.price} = {item.quantity * item.price}
                              </span>
                            </Col>
                          </Row>
                        </div>
                        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <Button color="warning" onClick={($event) => onRemove($event, item)}>Remove</Button>
                      </div>
                      <hr />
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: '20px' }}>
                {!productsInCart.length && (
                  <Card>
                    <CardImg top width='100%' />
                    <CardBody>
                      <CardTitle tag='h5'>No Product Selected</CardTitle>
                    </CardBody>
                  </Card>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col>{productsInCart.length > 0 && <OrderSumSummary totalItemPrice={totalItemPrice}></OrderSumSummary>}</Col>
      </Row>
      <div className='help-text'>
        Need help? Check our <a href=''>help pages</a> or <a href=''>contact us 24x7</a>
      </div>
      <div className='info-text'>
        When your order is placed, we'll send you an e-mail message acknowledging receipt of your order. If you choose to pay using an
        electronic payment method (credit card, debit card or net banking), you will be directed to your bank's website to complete your
        payment. Your contract to purchase an item will not be complete until we receive your electronic payment and dispatch your item. If
        you choose to pay using Pay on Delivery (POD), you can pay using cash/card/net banking when you receive your item.
      </div>
    </>
  );
};

export default CheckoutPage;
