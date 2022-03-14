import twitterLogo from '../images/twitter-logo.png';
type Props = {};

const Login = (props: Props) => {
  return (
    <div className="login-container">
      <img src={twitterLogo} alt="twitter" />
      <p className="login-text">Log in to Twitter</p>
      <input type="text" placeholder="Email address" className="login-email" />
      <input type="text" placeholder="Password" className="login-password" />
      <button className="login-button">Log In</button>
      <div className="login-text-container">
        <p className="login-password-reset">Forgot password?</p>
        <p className="login-signup">Sign up to Twitter</p>
      </div>
    </div>
  );
};

export default Login;
