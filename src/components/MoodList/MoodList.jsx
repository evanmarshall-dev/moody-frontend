import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./MoodList.module.scss";
import { UserContext } from "../../contexts/UserContext";
import * as moodService from "../../services/moodService";

const MoodList = () => {
  const [moods, setMoods] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const data = await moodService.index();
        setMoods(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMoods();
  }, []);

   return (
    <main className={styles.moodList}>
      <header className={styles.header}>
        <h1>Your moods, in one place.</h1>
        <hr />
      </header>

      {!Array.isArray(moods) || moods.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>It's a little quiet in here...</h2>
          <p>
            Start tracking your emotions to see your mood history and discover
            valuable insights.
          </p>
          <Link to="/new-mood" className={styles.callToAction}>
            Create Your First Mood
          </Link>
        </div>
      ) : (
        <section className={styles.grid}>
          {moods.map((mood) => (
            <Link
              key={mood._id}
              to={`/moods/${mood._id}`}
              className={styles.cardLink}
            >
              <article className={styles.card}>
                <header className={styles.cardHeader}>
                  <h2>{mood.title}</h2>
                  <span className={styles.category}>{mood.category}</span>
                </header>

                <p className={styles.description}>
                  {mood.description || "No description provided."}
                </p>

                <footer className={styles.cardFooter}>
                  <span>Intensity: {mood.intensity}</span>
                  <small>
                    {mood.author.username} •{" "}
                    {new Date(mood.dateRecorded).toLocaleDateString()}
                  </small>
                </footer>
              </article>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
};

export default MoodList;
