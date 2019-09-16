import React, { Component } from 'react';
import { connect } from 'react-redux';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    // ingredients: null, // Implemented as this.props.ings by Redux
    // totalPrice: 4,  // Implemented as this.props.price by Redux
    // purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // axios.get('https://burgerbuilder-2eedd.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({
    //       ingredients: response.data
    //     });
    //   })
    //   .catch(_ => {
    //     this.setState({
    //       error: true
    //     });
    //   });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
    .map(ingredientKey => {
      return ingredients[ingredientKey];
    })
    .reduce((sum, el) => {
      return sum + el;
    }, 0);
    // this.setState({
    //   purchaseable: sum > 0
    // });
    return sum > 0;
  }

  // Replaced by Redux
  //
  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: updatedPrice
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // Replaced by Redux
  //
  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: updatedPrice
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  }

  purchaseContinueHandler = () => {
    // const queryParams = [];
    // let i;
    // for (i in this.state.ingredients) {
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push('price=' + this.state.totalPrice);
    // const queryString = queryParams.join('&');
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryString
    // });
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      // ...this.state.ingredients
      ...this.props.ings
    };
    let key;
    for (key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    if (this.state.loading) {
      orderSummary = (
        <Spinner></Spinner>
      );
    }
    let burger = this.state.error ? <p>Ingredients cannot be loaded!</p> : <Spinner></Spinner>;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}></Burger>
          <BuildControls
            // ingredientAdded={this.addIngredientHandler}
            ingredientAdded={this.props.onIngredientAdded}
            // ingredientRemoved={this.removeIngredientHandler}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            // purchaseable={this.state.purchaseable}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}
          ></BuildControls>
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        ></OrderSummary>
      );
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (name) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: name}),
    onIngredientRemoved: (name) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: name}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));