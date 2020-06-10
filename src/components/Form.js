import React, { useRef } from 'react';

export default function Form() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(name, email, password);
  };

  return (
    <>
      <h1>Form (useRef sample)</h1>
      <form autoComplete="off">
        <label htmlFor="name">
          <input type="text" placeholder="name" ref={nameRef} id="name" />
        </label>
        <label htmlFor="email">
          <input type="text" placeholder="email" ref={emailRef} id="email" />
        </label>
        <label htmlFor="password">
          <input
            type="text"
            placeholder="password"
            ref={passwordRef}
            id="password"
          />
        </label>
        <br />
        <button type="button" onClick={() => nameRef.current.focus()}>
          Focus on name
        </button>
        <button type="button" onClick={() => emailRef.current.focus()}>
          Focus on email
        </button>
        <button type="button" onClick={() => passwordRef.current.focus()}>
          Focus on password
        </button>
        <br />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
}
