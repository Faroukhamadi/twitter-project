import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, createContext } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';

export const UserContext = createContext(null);

const App = () => {
  const [value, setValue] = useState('hello from context');
  const [currentUser, setCurrentUser] = useState({});

  const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setCurrentUser({ email, password });
        console.log('letss goooo');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <UserContext.Provider value={currentUser}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup signup={signup} />}></Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
