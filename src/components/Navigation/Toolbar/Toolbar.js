import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import styles from './Toolbar.module.css';

const toolbar = (props) => (
  <header className={styles.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked}></DrawerToggle>
    <div className={styles.Logo}>
      <Logo></Logo>
    </div>
    <nav className={styles.DesktopOnly}>
      <NavigationItems></NavigationItems>
    </nav>
  </header>
);

export default toolbar