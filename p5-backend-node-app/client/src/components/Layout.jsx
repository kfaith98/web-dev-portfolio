import { Outlet } from 'react-router-dom';
import styles from '../css/Layout.module.css';

export default function Layout({ onLogout }) {
  const username = localStorage.getItem('username');

  return (
    <>
      <header className={styles['event-header']}>
        <span className={styles['logo']}>
          On the <span className={styles['logo-accent']}>Books</span>
        </span>

        <div className={styles['user-area']}>
          {username && (
            <span className={styles['username']}>Signed in as {username}</span>
          )}
          <button type="button" className="btn-look" onClick={onLogout}>
            Sign out
          </button>
        </div>
      </header>
      <Outlet />
    </>
  );
}