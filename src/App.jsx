import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";

import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Landing from "./components/Landing/Landing";
import NewMood from "./components/NewMood/NewMood.jsx";

import { UserContext } from "./contexts/UserContext";

const App = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/new-mood" element={user ? <NewMood /> : <SignInForm />} />
        <Route path="*" element={<h2>404: Page Not Found</h2>} />
      </Routes>
    </>
  );
};

export default App;
