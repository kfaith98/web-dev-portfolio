import { useState } from 'react';
import { getRecommendations } from '../api';
import styles from '../css/RecommendationsPanel.module.css';

export default function RecommendationsPanel({ eventId }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    try {
      const data = await getRecommendations(eventId);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function renderContent() {
    if (loading) {
      return (
        <p className={styles.muted}>
          Asking Gemini… this can take a few seconds.
        </p>
      );
    }

    if (error) {
      return <p className={styles.muted}>Couldn't get suggestions: {error}</p>;
    }

    if (!result) {
      return null;
    }

    // Backend returns suggestions: null when Gemini fails; show the deterministic gaps instead
    if (result.suggestions === null) {
      return (
        <>
          <p className={styles.muted}>
            AI suggestions are unavailable right now. Try again in a moment.
          </p>
          {result.gapCategories.length > 0 && (
            <p className={styles.muted}>
              Categories not yet covered: {result.gapCategories.join(', ')}
            </p>
          )}
        </>
      );
    }

    if (result.gapCategories.length === 0) {
      return (
        <p className={styles.muted}>
          Every category is covered for this event.
        </p>
      );
    }

    if (result.suggestions.length === 0) {
      return (
        <p className={styles.muted}>
          No suggestions right now. The supplier pool has no one for this
          event's open categories.
        </p>
      );
    }

    return (
      <ul className={styles.list}>
        {result.suggestions.map((suggestion) => (
          <li key={suggestion._id} className={styles.item}>
            <p className={styles.name}>{suggestion.name}</p>
            <p className={styles.category}>{suggestion.category}</p>
            <p className={styles.reasoning}>{suggestion.reasoning}</p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className={styles.panel}>
      <div className={styles['panel-header']}>
        <h2>AI supplier suggestions</h2>
        <button
          type="button"
          className="btn-look"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? 'Thinking…' : result ? 'Refresh' : 'Suggest suppliers'}
        </button>
      </div>
      <p className={styles.caption}>
        Finds the categories this event hasn't covered, then asks Gemini which
        suppliers from the pool fit.
      </p>
      {renderContent()}
    </section>
  );
}
