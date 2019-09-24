import React, { Suspense, useEffect } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Logout from './containers/Auth/Logout/Logout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const App = props => {
  const { isAuthenticated, onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path='/auth' render={props => <Auth {...props}></Auth>}></Route>
      <Route path='/' exact component={BurgerBuilder}></Route>
      <Redirect to='/'></Redirect>
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/auth' render={props => <Auth {...props}></Auth>}></Route>
        <Route path='/logout' component={Logout}></Route>
        <Route path='/checkout' render={props => <Checkout {...props}></Checkout>}></Route>
        <Route path='/orders' render={props => <Orders {...props}></Orders>}></Route>
        <Route path='/' exact component={BurgerBuilder}></Route>
        <Redirect to='/'></Redirect>
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
