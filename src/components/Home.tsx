import twitterLogo from '../images/twitter-logo.png';
import homeLogo from '../images/home-logo.png';
import { firebaseConfig } from '../firebase-config.js';
import { UserContext } from '../App';
import Post from './Post';
import { useContext } from 'react';

type Props = {};

const Home = (props: Props) => {
  const currentUser = useContext(UserContext);

  console.log('This is the current user: ', currentUser);

  // console.log(UserContext.displayName);
  // console.log(UserContext.Provider);
  // console.log(UserContext.Consumer);

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
        <div className="home-posts-container">
          <div className="search-bar-container">
            <input
              type="text"
              className="home-posts-search"
              placeholder="Search Posts"
            />
          </div>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
      <div className="home-right-navigation">
        <input
          type="text"
          className="home-search"
          placeholder="Search Twitter"
        />
        <div className="home-signup">
          <p className="p1">New to Twitter?</p>
          <p className="p2">
            Sign up to get your own personalized <br /> timeline!
          </p>
          <button className="home-signup-button">Sign up</button>
        </div>
        <p>
          This is a project by
          <a
            href="https://github.com/Faroukhamadi"
            target="_blank"
            className="github-link"
            rel="noreferrer"
          >
            {' '}
            <span>Farouk Hamadi.</span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
