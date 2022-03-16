import { useContext, useRef } from 'react';
import twitterLogo from '../images/twitter-logo.png';
import { UserContext } from '../App';

const Login = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { email, password } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await props.login(emailRef.current.value, passwordRef.current.value);
      console.log('login is done');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="login-container" onSubmit={handleSubmit}>
      <img src={twitterLogo} alt="twitter" />
      <p className="login-text">Log in to Twitter</p>
      <input
        type="text"
        placeholder="Email address"
        className="login-email"
        ref={emailRef}
      />
      <input
        type="text"
        placeholder="Password"
        className="login-password"
        ref={passwordRef}
      />
      <button className="login-button" type="submit">
        Log In
      </button>
      <div className="login-text-container">
        <p className="login-password-reset">Forgot password?</p>
        <p className="login-signup">Sign up to Twitter</p>
      </div>
    </form>
  );
};

export default Login;
