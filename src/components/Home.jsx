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

const Home = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Hellooooooooooooooo');

    const postsRef = collection(db, 'posts');

    // const writeData = async () => {
    //   await setDoc(doc(postsRef, 'post5'), {
    //     commentCount: 0,
    //     date: 'Sun Jan 04 2022',
    //     likeCount: 0,
    //     retweetCount: 0,
    //     text: 'Fourth Post',
    //     userAt: 'ALIA2234',
    //     userName: 'alia',
    //   });
    // };
    const fetchData = async () => {
      const q = query(collection(db, 'posts'));
      const tempArr = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        tempArr.push(doc.data());
      });
      setPosts(tempArr);
      setIsLoading(false);
    };
    // writeData();
    fetchData();
  }, []);

  const currentUser = useContext(UserContext);
  console.log('This is the current user: ', currentUser);
  console.log('this is the posts array', posts);
  console.log('Is it loading ?', isLoading);

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
                userName={post.userName}
                userAt={post.userAt}
                text={post.text}
                date={post.date}
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
