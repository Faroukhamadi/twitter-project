import { useRef, useState, useContext } from 'react';
import twitterLogo from '../images/twitter-logo.png';
import { UserContext } from '../App';

const SignUp = (props) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { email, password } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    props.signup(emailRef.current.value, passwordRef.current.value);
  };

  return (
    <form className="signup-container" onSubmit={handleSubmit}>
      <img src={twitterLogo} alt="twitter" />
      <p className="signup-text">Create an account</p>
      <input
        type="text"
        className="signup-name"
        placeholder="Name"
        ref={nameRef}
      />
      <input
        type="text"
        className="signup-email"
        placeholder="Email"
        ref={emailRef}
      />
      <input
        type="text"
        className="signup-password"
        placeholder="Password"
        ref={passwordRef}
      />
      <button className="signup-button" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;