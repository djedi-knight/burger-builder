import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css'

const SideDrawer = props => {
  let attachedClasses = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attachedClasses = [styles.SideDrawer, styles.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}></Backdrop>
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={styles.Logo}>
          <Logo></Logo>
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth}></NavigationItems>
        </nav>
      </div>
    </Aux>
  ); 
};

export default SideDrawer