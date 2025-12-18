import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as moodService from '../../services/moodService';
import styles from "../NewMood/NewMood.module.scss"; // Reusing styles

const EditMood = () => {
  const { moodId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Happy",
    intensity: 5,
  });

  useEffect(() => {
    const fetchMood = async () => {
      try {
        const moodData = await moodService.show(moodId);
        setFormData({
          title: moodData.title,
          description: moodData.description || "",
          category: moodData.category,
          intensity: moodData.intensity,
        });
      } catch (err) {
        setError("Failed to load mood");
      }
    };
    fetchMood();
  }, [moodId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "intensity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await moodService.update(moodId, formData);
      navigate(`/moods/${moodId}`);
    } catch (err) {
      setError("Failed to update mood");
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/moods/${moodId}`);
  };

  return (
    <div className={styles.newMoodContainer}>
      <div className={styles.newMoodContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Edit Mood</h1>
          <p className={styles.subtitle}>Update how you're feeling.</p>
        </header>

        {error && (
          <div className={styles.errorMessage} role="alert">
            {error}
          </div>
        )}

        <form className={styles.moodForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.formLabel}>
              Title <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.formInput}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.formLabel}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.formTextarea}
              rows="4"
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.formLabel}>
              Category <span className={styles.required}>*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.formSelect}
              required
              disabled={isLoading}
            >
              <option value="Happy">Happy</option>
              <option value="Sad">Sad</option>
              <option value="Angry">Angry</option>
              <option value="Excited">Excited</option>
              <option value="Anxious">Anxious</option>
              <option value="Relaxed">Relaxed</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="intensity" className={styles.formLabel}>
              Intensity <span className={styles.required}>*</span>
              <output htmlFor="intensity" className={styles.intensityValue}>
                {formData.intensity}
              </output>
            </label>
            <input
              type="range"
              id="intensity"
              name="intensity"
              min="1"
              max="10"
              value={formData.intensity}
              onChange={handleChange}
              className={styles.formRange}
              required
              disabled={isLoading}
            />
            <small>Scale from 1 (low) to 10 (high)</small>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Mood"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMood;