import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.module.css';

const Modal = props => {
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed}></Backdrop>
      <div
        className={styles.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}
      >{props.children}
      </div>
    </Aux>
  );
}

export default React.memo(Modal, (prevProps, nextProps) => {
  return nextProps.show === prevProps.props.show && nextProps.children === prevProps.children;
});