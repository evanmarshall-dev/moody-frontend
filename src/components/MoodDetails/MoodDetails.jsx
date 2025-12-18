import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as moodService from '../../services/moodService';


const MoodDetails = () => {
  const { moodId } = useParams();
  const [mood, setMood] = useState(null);
  

  useEffect(() => {
    const fetchMood = async () => {
      const moodData = await moodService.show(moodId);
      setMood(moodData);
    }
    fetchMood();
  }, [moodId]);
 

  if (!mood) return <main>Loading...</main>
  return (
    <main>
      <section>
        <header>
          <h1>{mood.title}</h1>
          <h2>{mood.category}</h2>

        </header>
        <p>{mood.intensity}</p>
        <p>{mood.description}</p>
        <p>
          {`${mood.author.username} posted on
          ${new Date(mood.dateRecorded).toLocaleDateString()}`}
        </p>
      </section>
    </main>
  );
}

export default MoodDetails;
