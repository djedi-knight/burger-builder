import React, { Component } from 'react';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }

  componentDidMount() {
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
      this.setState({
        orders: fetchedOrders,
        loading: false,
      });
    })
    .catch(_ => {
      this.setState({
        loading: false
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          ></Order>
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);