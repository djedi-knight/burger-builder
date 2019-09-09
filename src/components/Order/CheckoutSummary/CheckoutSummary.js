import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{width: '100%', height: '300px', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}></Burger>
        <Button buttonType='Danger'>CANCEL</Button>
        <Button buttonType='Success'>CONTINUE</Button>
      </div>
    </div>
  );
};

export default checkoutSummary;