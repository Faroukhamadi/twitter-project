import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, createContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebase-config';

export const UserContext = createContext(null);

const App = () => {
  // IMPORTANT: Might need this later
  // const [value, setValue] = useState('hello from context');
  const [hasAccount, setHasAccount] = useState(false);
  const [isWrongPassword, setisWrongPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setCurrentUser({ email, password });
        setHasAccount(false);
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
      .then(() => {
        setCurrentUser({ email, password });
        setIsLoggedIn(true);
        setisWrongPassword(true);
      })
      .catch((error) => {
        if (error.message === 'Firebase: Error (auth/wrong-password).') {
          setisWrongPassword(true);
        }
      });
  };

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
