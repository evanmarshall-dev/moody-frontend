import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav className={styles.navbar}>
      {user ? (
        <ul className={styles.navbarNav}>
          <li>Welcome, {user.username}</li>
          <li>
            <Link to="/moods">Your Moods</Link>
          </li>
          <li>
            <Link to="/new-mood">New Mood</Link>
          </li>
          <li>
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        </ul>
      ) : (
        <ul className={styles.navbarNav}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
