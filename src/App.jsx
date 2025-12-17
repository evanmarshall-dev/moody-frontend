import { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';

import Dashboard from './components/Dashboard/Dashboard.jsx';
import Landing from './components/Landing/Landing';

import * as moodService from './services/moodService.js';
import MoodList from './components/MoodList/MoodList.jsx';

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);
  const [mood, setMoods] = useState([]);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
          <Route path='/moods' element={<MoodList />} />
          </>
        ) : (
          <>
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        </>
        )}
      </Routes>
    </>
  );
};

export default App;