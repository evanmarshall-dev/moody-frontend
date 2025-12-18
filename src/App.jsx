import { useContext, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";

import Landing from "./components/Landing/Landing";
import NewMood from "./components/NewMood/NewMood.jsx";

import * as moodService from "./services/moodService.js";
import MoodList from "./components/MoodList/MoodList.jsx";
import MoodDetails from "./components/MoodDetails/MoodDetails.jsx";

import { UserContext } from "./contexts/UserContext";

const App = () => {
  const { user } = useContext(UserContext);
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const fetchAllMoods = async () => {
      const moodsData = await moodService.index();
      setMoods(moodsData);
    };
    if (user) fetchAllMoods();
  }, [user]);
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/moods" replace /> : <Landing />}
        />

        {user ? (
          <>
            <Route path="/moods" element={<MoodList moods={moods} />} />
            <Route path="/moods/:moodId" element={<MoodDetails />} />
            <Route path="/new-mood" element={<NewMood />} />
          </>
        ) : (
          <>
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
