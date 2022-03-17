// IMPORTANT: Might need this later to write data
import twitterLogo from '../images/twitter-logo.png';
import homeLogo from '../images/home-logo.png';
import { firebaseConfig } from '../firebase-config.js';
import { UserContext } from '../App';
import Post from './Post';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase-config';
import uniqid from 'uniqid';

const Home = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  const toggleUpdate = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    const postsRef = collection(db, 'posts');

    const fetchData = async () => {
      const q = query(collection(db, 'posts'));
      const tempArr = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        tempArr.push({ ...doc.data(), id: doc.id });
      });
      setPosts(tempArr);
      setIsLoading(false);
    };
    fetchData();
  }, [update]);

  const currentUser = useContext(UserContext);

  return (
    <div className="home-container">
      <div className="home-left-navigation">
        <img src={twitterLogo} alt="twitter" className="home-twitter-logo" />
        <button className="home-home-button">
          <img src={homeLogo} alt="home" />
        </button>
        <button
          onClick={() => navigate('/', { replace: true })}
          className="home-tweet-button"
        >
          Tweet
        </button>
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
          {!isLoading &&
            posts.map((post) => (
              <Post
                key={uniqid()}
                userName={post.userName}
                userAt={post.userAt}
                text={post.text}
                date={post.date}
                commentCount={post.commentCount}
                likeCount={post.likeCount}
                retweetCount={post.retweetCount}
                id={post.id}
                toggleUpdate={toggleUpdate}
              />
            ))}
        </div>
      </div>
      <div className="home-right-navigation">
        <input
          type="text"
          className="home-search"
          placeholder="Search Twitter"
        />
        {Object.keys(props.currentUser).length === 0 ? (
          <div className="home-signup">
            <p className="p1">New to Twitter?</p>
            <p className="p2">
              Sign up to get your own personalized <br /> timeline!
            </p>
            <button
              className="home-signup-button"
              onClick={() => {
                navigate('/signup', { replace: true });
              }}
            >
              Sign up
            </button>
          </div>
        ) : (
          <div className="home-signout">
            <p className="p3">
              Want to Sign Out of Twitter{' '}
              <span className="user-name">{props.currentUser.name}</span> ?
            </p>
            <button
              className="home-signout-button"
              onClick={() => {
                props.signout();
                navigate('/signout', { replace: true });
              }}
            >
              Sign out
            </button>
          </div>
        )}
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
