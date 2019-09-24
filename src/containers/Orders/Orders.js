import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const Orders = props => {
  const { token, loading, orders, onFetchOrders, userId } = props;
  
  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  let orderList = (
    <Spinner></Spinner>
  );
  if (!loading) {
    orderList = orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      ></Order>
    ));
  }

  return (
    <div>
      {orderList}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));