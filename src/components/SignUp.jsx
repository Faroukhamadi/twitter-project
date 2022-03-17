import { useRef, useState, useContext } from 'react';
import twitterLogo from '../images/twitter-logo.png';
import { UserContext } from '../App';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await props.signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );
    } catch (error) {
      console.error(error);
    }
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
      <p
        onClick={() => navigate('/login', { replace: true })}
        className="link-to-login"
      >
        Already Have An Account?Login Here
      </p>
      {props.hasAccount && (
        <Alert variant="danger">
          <Alert.Heading>Account already exists. Try Again</Alert.Heading>
        </Alert>
      )}
    </form>
  );
};

export default SignUp;
