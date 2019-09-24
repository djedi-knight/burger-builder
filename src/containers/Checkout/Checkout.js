import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = props => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  }

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  }

  let summary = (
    <Redirect to='/'></Redirect>
  );
  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to='/'></Redirect> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        ></CheckoutSummary>
        <Route
          path={props.match.path + '/contact-data'}
          component={ContactData}
        ></Route>
      </div>
    );
  }

  return summary;
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);