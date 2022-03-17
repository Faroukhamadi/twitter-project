import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import SignOut from './components/SignOut';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebase-config';

export const UserContext = createContext(null);

const App = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const [isWrongPassword, setisWrongPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const signup = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: name,
        }).then(() => {
          console.log('name added');
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

  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log('sign-out successful');
      })
      .catch((error) => {
        console.error(error, 'happened');
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({ name: user.displayName, email: user.email });
        console.log('were at auth state changed');
      } else {
        setCurrentUser({});
        console.log(
          'Here user fucked up, i think it means that he s not signed in'
        );
      }
    });
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home signout={signout} currentUser={currentUser} />}
          ></Route>
          <Route path="signout" element={<SignOut />}></Route>
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
