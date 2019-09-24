import React from 'react';

import styles from './Button.module.css';

const Button = props => (
  <button
    disabled={props.disabled}
    className={[styles.Button, styles[props.buttonType]].join(' ')}
    onClick={props.clicked}
  >{props.children}
  </button>
);

export default Button;