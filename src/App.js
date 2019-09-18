import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from  './containers/Auth/Auth';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Layout from './hoc/Layout/Layout';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path='/auth' component={Auth}></Route>
          <Route path='/checkout' component={Checkout}></Route>
          <Route path='/orders' component={Orders}></Route>
          <Route path='/' exact component={BurgerBuilder}></Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
