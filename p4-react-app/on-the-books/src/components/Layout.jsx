import { Outlet } from "react-router-dom";
import styles from "../css/Layout.module.css";


export default function Layout() {
  return (
    <>
      <header className={styles["event-header"]}>
        <h2>On the Books</h2>
      </header>
      <Outlet />
    </>
  );
}