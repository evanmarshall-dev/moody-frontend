import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Landing.module.scss';
import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

const Landing = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [showSignIn, setShowSignIn] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await signIn(formData);
      setUser(user);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className={styles.landing}>
      <section className={styles.welcome}>
        <h1>Welcome to Moody</h1>
        <p>Track your daily emotions and discover patterns in your mental health.</p>
      </section>
      <section className={styles.formContainer}>
        <div className={`${styles.initialActions} ${showSignIn ? styles.hidden : ''}`}>
          <button onClick={() => setShowSignIn(true)}>Sign In</button>
          <button onClick={() => navigate('/sign-up')}>Sign Up</button>
        </div>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className={`${styles.signInForm} ${showSignIn ? styles.visible : ''}`}
        >
          <h1>Sign In</h1>
          <p>{message}</p>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.buttonContainer}>
            <button>Sign In</button>
            <button type="button" className={styles.secondary} onClick={() => setShowSignIn(false)}>
              Cancel
            </button>
          </div>
          <p>
            Don't have an account?{' '}
            <a onClick={() => navigate('/sign-up')}>Sign Up</a>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Landing;
