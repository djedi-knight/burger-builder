import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  render() {
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data:</h4>
        <form>
          <input className={styles.Input} type='text' name='name' placeholder='Your Name'></input>
          <input className={styles.Input} type='email' name='email' placeholder='Your Email'></input>
          <input className={styles.Input} type='text' name='street' placeholder='Your Street'></input>
          <input className={styles.Input} type='text' name='postal' placeholder='Your Postal Code'></input>
          <Button
            buttonType='Success'
            // clicked={}
          >ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;