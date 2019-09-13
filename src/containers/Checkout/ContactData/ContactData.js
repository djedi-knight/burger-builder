import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
    };
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({
          loading: false
        });
      });
  }

  render() {
    let form = (
      <form>
        <Input inputtype='input' type='text' name='name' placeholder='Your Name'></Input>
        <Input inputtype='input' type='email' name='email' placeholder='Your Email'></Input>
        <Input inputtype='input' type='text' name='street' placeholder='Your Street'></Input>
        <Input inputtype='input' type='text' name='postal' placeholder='Your Postal Code'></Input>
        <Button
          buttonType='Success'
          clicked={this.orderHandler}
        >ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = (
        <Spinner></Spinner>
      );
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data:</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;