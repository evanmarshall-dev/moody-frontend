import { Link } from 'react-router';

const MoodList = (props) => {
  return (
  <main>
    {props.moods.map((mood) => (
      <Link key={mood._id} to={`/moods/${mood._id}`}>
        <article>
          <header>
            <h2>{mood.title}</h2>
            <h3>{mood.category}</h3>
            <h3>Mood Intensity:{mood.intensity}</h3>
          </header>
          <p>{mood.description}</p>
          <p>
            {`${mood.author.username} posted on
            ${new Date(mood.dateRecorded).toLocaleDateString()}`}
          </p>
        </article>
      </Link>
    ))}
  </main>
  );
};


export default MoodList;