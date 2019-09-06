import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './Toolbar.module.css';

const toolbar = (props) => (
  <header className={styles.Toolbar}>
    <div>MENU</div>
    <Logo></Logo>
    <nav>
      <NavigationItems></NavigationItems>
    </nav>
  </header>
);

export default toolbar