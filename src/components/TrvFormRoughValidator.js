import React, { useRef, useState, useReducer } from 'react';
import heading from '../config/heading';

export default function TrvFormRoughValidator() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const [usernameErrorMessage, dispatchUsernameErrorMessage] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'tooShort':
          return 'Username must be at least 3 characters';
        case 'tooLong':
          return 'Username must be less than 15 characters';
        case 'reset':
          return '';
        default:
          return state;
      }
    },
    ''
  );
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [passwordErrorMessage, dispatchPasswordErrorMessage] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'tooShort':
          return 'Password must be at least 6 characters';
        case 'tooLong':
          return 'Password must be less than 25 characters';
        case 'reset':
          return '';
        default:
          return state;
      }
    },
    ''
  );
  const [
    passwordConfirmErrorMessage,
    setPasswordConfirmErrorMessage,
  ] = useState('');

  const validateUsername = (text) => {
    if (text.length < 3) {
      dispatchUsernameErrorMessage({ type: 'tooShort' });
      return;
    }
    if (text.length > 15) {
      dispatchUsernameErrorMessage({ type: 'tooLong' });
      return;
    }
    dispatchUsernameErrorMessage({ type: 'reset' });
  };
  const validateEmail = (email) => {
    setIsValidEmail(/^.+@.+\..+$/.test(email));
  };
  const validatePassword = (password) => {
    if (password.length < 6) {
      dispatchPasswordErrorMessage({ type: 'tooShort' });
      return;
    }
    if (password.length > 25) {
      dispatchPasswordErrorMessage({ type: 'tooLong' });
      return;
    }
    dispatchPasswordErrorMessage({ type: 'reset' });
  };
  const validatePasswordConfirm = (passwordConfirm) => {
    if (passwordConfirm.length === 0) {
      setPasswordConfirmErrorMessage('This field is required');
      return;
    }
    if (passwordConfirm !== passwordConfirmErrorMessage) {
      setPasswordConfirmErrorMessage('Passwords do not match');
      return;
    }
    setPasswordConfirmErrorMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateUsername(usernameRef.current.value);
    validateEmail(emailRef.current.value);
    validatePassword(passwordRef.current.value);
    validatePasswordConfirm(passwordConfirmRef.current.value);
  };
  const handleInputEnter = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <>
      <h1>{heading.trvFormRoughValidator}</h1>
      <form autoComplete="off">
        <label htmlFor="username">
          <input
            type="text"
            ref={usernameRef}
            onKeyPress={handleInputEnter}
            placeholder="username"
            id="username"
          />
        </label>
        <div>{usernameErrorMessage}</div>
        <label htmlFor="email">
          <input
            type="email"
            ref={emailRef}
            onKeyPress={handleInputEnter}
            placeholder="email"
            id="email"
          />
        </label>
        <div>{isValidEmail ? '' : 'Email is not valid'}</div>
        <label htmlFor="password">
          <input
            type="password"
            ref={passwordRef}
            onKeyPress={handleInputEnter}
            placeholder="password"
            id="password"
          />
        </label>
        <div>{passwordErrorMessage}</div>
        <label htmlFor="passwordConfirm">
          <input
            type="passwordConfirm"
            ref={passwordConfirmRef}
            onKeyPress={handleInputEnter}
            placeholder="passwordConfirm"
            id="passwordConfirm"
          />
        </label>
        <div>{passwordConfirmErrorMessage}</div>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
}
