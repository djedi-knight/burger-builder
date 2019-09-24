import React, { useState } from 'react';
import { connect } from 'react-redux';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Aux from '../Aux/Aux';
import styles from './Layout.module.css';

const Layout = props => {
  const [ showSideDrawer, setShowSideDrawer ] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  }

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  }

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      ></Toolbar>
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
      ></SideDrawer>
      <main className={styles.Content}>
        {props.children}
      </main>
    </Aux>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

export default connect(mapStateToProps)(Layout);