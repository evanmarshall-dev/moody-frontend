import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewMood.module.scss";

const NewMood = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Happy",
    intensity: 5,
  });

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
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required. Please sign in.");
      }

      const response = await fetch("http://localhost:3000/moods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create mood");
      }

      navigate("/");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className={styles.newMoodContainer}>
      <div className={styles.newMoodContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Create New Mood</h1>
          <p className={styles.subtitle}>
            How are you feeling? Share your mood with us.
          </p>
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
              placeholder="e.g., My Mood Today"
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
              placeholder="Describe your mood... (optional)"
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
              aria-describedby="intensity-help"
            />
            <small id="intensity-help">Scale from 1 (low) to 10 (high)</small>
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
              {isLoading ? "Saving..." : "Create Mood"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMood;
