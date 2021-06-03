import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Button, Row, Col } from 'reactstrap';

const OrderSumSummary = (props) => {
  const [deliveryCharge] = useState('60.00'); // fixed
  const [totalOrderSum, setTotalOrderSum] = useState('');

  useEffect(() => {
    console.log(props);
    const sum = Number(props.totalItemPrice) + Number(deliveryCharge);
    setTotalOrderSum(sum.toFixed(2));
  }, [props]);

  return (
    <>
      <Card>
        <CardBody>
          <Button className='place-order-btn'>Place Your Order</Button>
          <CardTitle tag='h6'>Order Summary</CardTitle>
          <div>
            <Row>
              <Col>Items: </Col>
              <Col>{props.totalItemPrice}</Col>
            </Row>
            <Row>
              <Col>Delivery: </Col>
              <Col>{deliveryCharge}</Col>
            </Row>
          </div>
          <hr />
          <Row className='order-summary-row'>
            <Col>Order Total: </Col>
            <Col>{totalOrderSum}</Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default OrderSumSummary;
