import { useSlowHint } from '../hooks/useSlowHint';
import { COLD_START_HINT } from '../data/constants';

export default function StatusMessage({ children, loading = false }) {
  const isSlow = useSlowHint(loading);

  return (
    <div className="empty-state status-message">
      <p>{children}</p>
      {isSlow && <p className="status-hint">{COLD_START_HINT}</p>}
    </div>
  );
}