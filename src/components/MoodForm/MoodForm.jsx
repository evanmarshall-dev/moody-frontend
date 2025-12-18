import { useState } from "react";
import styles from "./MoodForm.module.scss";

const MoodForm = ({ mood, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    title: mood?.title || "",
    description: mood?.description || "",
    category: mood?.category || "Happy",
    intensity: mood?.intensity || 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "intensity" ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.moodForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.formLabel}>
          Title{" "}
          <span className={styles.required} aria-label="required">
            *
          </span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={styles.formInput}
          required
          placeholder="eg. My Mood Today"
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
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="intensity" className={styles.formLabel}>
          Intensity{" "}
          <span className={styles.required} aria-label="required">
            *
          </span>
          <output htmlFor="intensity" className="intensity-value">
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
          aria-describedby="intensity-help"
        />
        <small id="intensity-help">Scale from 1 (low) to 10 (high)</small>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category" className={styles.formLabel}>
          Category{" "}
          <span className={styles.required} aria-label="required">
            *
          </span>
        </label>
        <select
          name="category"
          id="category"
          required
          className={styles.formInput}
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Angry">Angry</option>
          <option value="Excited">Excited</option>
          <option value="Anxious">Anxious</option>
          <option value="Relaxed">Relaxed</option>
        </select>
      </div>

      <div className={styles.formActions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : mood ? "Update Mood" : "Add Mood"}
        </button>
      </div>
    </form>
  );
};

export default MoodForm;
