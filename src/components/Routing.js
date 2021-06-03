import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import RoutingPath from './RoutingPath';
import ShoppingDashboard from './online-shopping-store/ShoppingDashboard';

const Routing = (props) => {
  const styles = {
    contentDiv: {
      display: 'flex',
    },
    contentMargin: {
      marginLeft: '10px',
      width: '100%',
    },
  };
  return (
    <Router>
      <div style={styles.contentMargin}>
        <RoutingPath></RoutingPath>
      </div>
    </Router>
  );
};

export default Routing;
