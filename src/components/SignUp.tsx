import twitterLogo from '../images/twitter-logo.png';

type Props = {};

const SignUp = (props: Props) => {
  return (
    <div className="signup-container">
      <img src={twitterLogo} alt="twitter" />
      <p className="signup-text">Create an account</p>
      <input type="text" className="signup-name" placeholder="Name" />
      <input type="text" className="signup-email" placeholder="Email" />
      <input type="text" className="signup-password" placeholder="Password" />
      <button className="signup-button">Sign Up</button>
    </div>
  );
};

export default SignUp;
