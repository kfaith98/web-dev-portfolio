import { useState } from 'react';
import { login } from '../api';
import styles from '../css/Login.module.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await login(formData.username, formData.password);
      localStorage.setItem('token', res.token);
      onLogin();
    } catch (err) {
      setError(err.message);
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
         
          <button type="submit" className="btn-primary">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
