import { useState, useEffect } from 'react';
import { login, wakeServer } from '../api';
import { useSlowHint } from '../hooks/useSlowHint';
import { COLD_START_HINT } from '../data/constants';
import styles from '../css/Login.module.css';

const DEMO_USERNAME = 'demo_producer1';
const DEMO_PASSWORD = 'demo12345';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const isSlow = useSlowHint(submitting);

  useEffect(() => {
    wakeServer();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await login(formData.username, formData.password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', formData.username);
      onLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles['login-card']}>
        <h1>Log in</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles['login-fields']}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className={styles['login-fields']}>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
          </div>

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
          {isSlow && <p className="status-hint">{COLD_START_HINT}</p>}
        </form>
        <div className={styles['demo-hint']}>
          <p>Just looking around? Use the demo account:</p>
          <p>
            <strong>{DEMO_USERNAME}</strong> / <strong>{DEMO_PASSWORD}</strong>
          </p>
          <button
            type="button"
            className="btn-look"
            onClick={() =>
              setFormData({ username: DEMO_USERNAME, password: DEMO_PASSWORD })
            }
          >
            Fill in demo login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
