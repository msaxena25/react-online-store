import { Route, Switch } from 'react-router-dom';

import ProductList from './online-shopping-store/ProductList';
import ShoppingDashboard from './online-shopping-store/ShoppingDashboard';
import CheckoutPage from './online-shopping-store/CheckoutPage';

const RoutingPath = () => {
  return (
    <Switch>
      <Route exact path='/' component={ShoppingDashboard} />
      <Route path='/productlist' component={ProductList} />
      <Route path='/productcheckout' component={CheckoutPage} />
    </Switch>
  );
};

export default RoutingPath;
