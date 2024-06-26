import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const location = useLocation();

  const linkClassName =
    () =>
    ({ isActive }) =>
      isActive ? styles.navbar__item_active : styles.navbar__item_nonActive;

  const isAuthPage =
    location.pathname === "/sign-in" || location.pathname === "/sign-up";

  return (
    <>
      {isAuthPage ? null : (
        <div className={styles.navbar}>
          <ul className={styles.navbar__list}>
            <li className={styles.navbar__item}>
              <NavLink className={linkClassName()} to="/">
                Home
              </NavLink>
            </li>
            <li className={styles.navbar__item}>
              <NavLink className={linkClassName()} to="/trends">
                Trends
              </NavLink>
            </li>
            <li className={styles.navbar__item}>
              <NavLink className={linkClassName()} to="/favorites">
                Favorites
              </NavLink>
            </li>
            <li className={styles.navbar__item}>
              <NavLink className={linkClassName()} to="/settings">
                Settings
              </NavLink>
            </li>
          </ul>
          <span className={styles.navbar__copyright}>
            © All Rights Reserved
          </span>
        </div>
      )}
    </>
  );
};

export default Navbar;
