import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  // Replaced by Redux
  //
  // state = {
  //   ingredients: null,
  //   price: 0,
  // };

  // Replaced by Redux
  //
  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   let param;
  //   for (param of query.entries()) {
  //     if (param[0] === 'price') {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({
  //     ingredients: ingredients,
  //     totalPrice: price,
  //   });
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        ></CheckoutSummary>
        <Route
          path={this.props.match.path + '/contact-data'}
          // render={(props) => (
          //   <ContactData
          //     ingredients={this.props.ings}
          //     price={this.props.price}
          //     {...props}
          //   ></ContactData>
          // )}
          component={ContactData}
        ></Route>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(Checkout);