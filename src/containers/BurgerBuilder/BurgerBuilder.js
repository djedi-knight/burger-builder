import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

export const BurgerBuilder = props => {
  const {
    // error,
    history,
    // ings,
    // isAuthenticated,
    // onIngredientAdded,
    // onIngredientRemoved,
    // onInitIngredients,
    // onPurchaseBurgerInit,
    // onSetRedirectPath,
    // price
  } = props;

  const [ purchasing, setPurchasing ] = useState(false);

  const ings = useSelector(state => {
    return state.burgerBuilder.ingredients;
  });

  const price = useSelector(state => {
    return state.burgerBuilder.totalPrice;
  });

  const error = useSelector(state => {
    return state.burgerBuilder.error;
  });

  const isAuthenticated = useSelector(state => {
    return state.auth.token !== null;
  });

  const dispatch = useDispatch();

  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
  const onIngredientAdded = useCallback(name => dispatch(actions.addIngredient(name)), [dispatch]);
  const onIngredientRemoved = useCallback(name => dispatch(actions.removeIngredient(name)), [dispatch]);
  const onPurchaseBurgerInit = useCallback(() => dispatch(actions.purchaseBurgerInit()), [dispatch]);
  const onSetRedirectPath = useCallback(path => dispatch(actions.setAuthRedirectPath(path)), [dispatch]);

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
    .map(ingredientKey => {
      return ingredients[ingredientKey];
    })
    .reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetRedirectPath('/checkout');
      history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(true);
  }

  const purchaseContinueHandler = () => {
    onPurchaseBurgerInit();
    history.push('/checkout');
  }

  const disabledInfo = {
    ...ings
  };
  let key;
  for (key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }
  let orderSummary = null;
  let burger = error ? <p>Ingredients cannot be loaded!</p> : <Spinner></Spinner>;
  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings}></Burger>
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchaseable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
          price={price}
        ></BuildControls>
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ings}
        price={price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      ></OrderSummary>
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
}

// const mapStateToProps = state => {
//   return {
//     ings: state.burgerBuilder.ingredients,
//     price: state.burgerBuilder.totalPrice,
//     error: state.burgerBuilder.error,
//     isAuthenticated: state.auth.token !== null
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onInitIngredients: () => dispatch(actions.initIngredients()),
//     onIngredientAdded: (name) => dispatch(actions.addIngredient(name)),
//     onIngredientRemoved: (name) => dispatch(actions.removeIngredient(name)),
//     onPurchaseBurgerInit: () => dispatch(actions.purchaseBurgerInit()),
//     onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
export default withErrorHandler(BurgerBuilder, axios);