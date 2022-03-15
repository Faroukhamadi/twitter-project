import twitterLogo from '../images/twitter-logo.png';
import homeLogo from '../images/home-logo.png';
import { firebaseConfig } from '../firebase-config.js';

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="home-container">
      <div className="home-left-navigation">
        <img src={twitterLogo} alt="twitter" className="home-twitter-logo" />
        <button className="home-home-button">
          <img src={homeLogo} alt="home" />
        </button>
        <button className="home-tweet-button">Tweet</button>
      </div>
      <div className="home-posts">
        <div className="search-bar-container">
          <input
            type="text"
            className="home-posts-search"
            placeholder="Search Posts"
          />
        </div>
      </div>
      <div className="home-right-navigation">
        <input
          type="text"
          className="home-search"
          placeholder="Search Twitter"
        />
      </div>
    </div>
  );
};

export default Home;
