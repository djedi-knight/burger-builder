import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const purchaseBurgerInit = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_INIT,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
    .then(response => {
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    })
    .catch(error => {
      dispatch(purchaseBurgerFail(error));
    });
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrders = (orderData) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json')
    .then(response => {
      const fetchedOrders = [];
      let key;
      for (key in response.data) {
        fetchedOrders.push({
          ...response.data[key],
          id: key,
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(error => {
      dispatch(fetchOrdersFail(error));
    });
  };
};