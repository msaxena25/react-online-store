import { Card, CardBody, Button, Row, Col, Input } from 'reactstrap';
const ShippingPaymentAndCouponSection = () => {

    return (
        <Card>
        <CardBody>
          <Row>
            <Col>
              <div>
                <h6>Shipping address</h6>
                <address>
                  Js Mount, <br />
                  2nd floor, J Block, Sector 56, <br />
                  Delhi, India, 120010 <br />
                  Phone: 0123456789
                </address>
              </div>
            </Col>
            <Col>
              <h6>
                Payment Method <a href=''>change</a>
              </h6>
              <p>Pay on Delivery (Cash / Card)</p>
            </Col>
            <Col>
              <h6>Gift cards, Voucher & Promotional codes</h6>
              <Row>
                <Col>
                  <Input type='text' placeholder='Enter Code'></Input>
                </Col>
                <Col>
                  <Button>Apply</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
}

export default ShippingPaymentAndCouponSection;