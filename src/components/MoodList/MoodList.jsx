import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";

const MoodList = ({ moods = [] }) => {
  const { user } = useContext(UserContext);

  return (
    <main>
      <header>
        {/* <h1>Welcome, {user?.username}</h1> */}
        <h1>Your moods, in one place.</h1>
        <hr style={{ marginBottom: "2rem" }} />
      </header>

      {moods.length === 0 ? (
        <p>No moods yet. Create your first mood!</p>
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
