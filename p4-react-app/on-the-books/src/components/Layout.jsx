import { Outlet } from "react-router-dom";
import styles from "../css/Layout.module.css";

export default function Layout() {
  return (
    <>
      <header className={styles["event-header"]}>
        <span className={styles["logo"]}>
          On the <span className={styles["logo-accent"]}>Books</span>
        </span>
      </header>
      <Outlet />
    </>
  );
}
