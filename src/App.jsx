import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebase-config';

export const UserContext = createContext(null);

const App = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const [isWrongPassword, setisWrongPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const signup = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: name,
        }).then(() => {
          console.log('profile updated');
        });
        // setCurrentUser(userCredential.user);
        // userCredential.setHasAccount(false);
      })
      .catch((error) => {
        // if user already has an account
        if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
          setHasAccount(true);
        }
      });
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // setCurrentUser({ email, password });
        // setIsLoggedIn(true);
        // setisWrongPassword(true);
        // console.log({ email, password });
        // console.log(currentUser);
        console.log('operation type', userCredential.operationType);
        console.log('provider id', userCredential.providerId);
        console.log('user', userCredential.user.email);
        console.log('users name', userCredential.user.displayName);
      })
      .catch((error) => {
        if (error.message === 'Firebase: Error (auth/wrong-password).') {
          setisWrongPassword(true);
        }
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({ name: user.displayName, email: user.email });
        console.log('were at auth state changed');
        // console.log('Here user is logged in');
        // setCurrentUser(user.uid);
        // console.log('This is after user logged in', user.uid);
        // console.log(isLoggedIn);
        // console.log('current user state test', currentUser);
      } else {
        // console.log('Here user fucked up');
      }
    });
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="login" element={<Login login={login} />}></Route>
          <Route
            path="signup"
            element={<Signup signup={signup} hasAccount={hasAccount} />}
          ></Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
