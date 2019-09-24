import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity, updateObject } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import styles from './Auth.module.css';

const Auth = props => {
  const {
    authRedirectPath,
    buildingBurger,
    error,
    isAuthenticated,
    loading,
    onAuth,
    onSetAuthRedirectPath
  } = props;

  const [ controls, setControls ] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email Address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 7
      },
      valid: false,
      touched: false
    }
  });
  const [ isSignup, setIsSignup ] = useState(true);

  useEffect(() => {
    if (buildingBurger && authRedirectPath!== '/') {
      onSetAuthRedirectPath();
    }
  }, [authRedirectPath, buildingBurger, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, controls[controlName].validation),
        touched: true
      })
    });
    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElementsArray = [];
  let key;
  for (key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    });
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    ></Input>
  ));

  if (loading) {
    form = <Spinner></Spinner>;
  }

  let errorMessage = null;

  if (error) {
    errorMessage = (
      <p>{error.message}</p>
    );
  }

  let authRedirect = null;
  if (isAuthenticated) {
    authRedirect = <Redirect to={authRedirectPath}></Redirect>
  }

  return (
    <div className={styles.Auth}>
      {errorMessage}
      {authRedirect}
      <form onSubmit={submitHandler}>
        {form}
        <Button
          buttonType='Success'
        >SUBMIT</Button>
      </form>
      <Button
        buttonType='Danger'
        clicked={switchAuthModeHandler}
      >SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);