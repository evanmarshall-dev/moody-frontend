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
    <main>
      <header>
        {/* <h1>Welcome, {user?.username}</h1> */}
        <h1>Your moods, in one place.</h1>
        <hr style={{ marginBottom: "2rem" }} />
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
        moods.map((mood) => (
          <Link key={mood._id} to={`/moods/${mood._id}`}>
            <article>
              <header>
                <h2>{mood.title}</h2>
                <h3>{mood.category}</h3>
                <h3>Mood Intensity: {mood.intensity}</h3>
              </header>
              <p>{mood.description}</p>
              <p>
                {`${mood.author.username} posted on ${new Date(
                  mood.dateRecorded
                ).toLocaleDateString()}`}
              </p>
            </article>
          </Link>
        ))
      )}
    </main>
  );
};

export default MoodList;
