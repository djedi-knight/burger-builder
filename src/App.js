import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Logout from './containers/Auth/Logout/Logout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth}></Route>
        <Route path='/' exact component={BurgerBuilder}></Route>
        <Redirect to='/'></Redirect>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/auth' component={asyncAuth}></Route>
          <Route path='/logout' component={Logout}></Route>
          <Route path='/checkout' component={asyncCheckout}></Route>
          <Route path='/orders' component={asyncOrders}></Route>
          <Route path='/' exact component={BurgerBuilder}></Route>
          <Redirect to='/'></Redirect>
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
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
