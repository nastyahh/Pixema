import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { useSelector } from "react-redux";
import { IMenu, State } from "../../utility/types";
import { useContext, useMemo } from "react";
import { BurgerMenuContext, ThemeContext } from "../../Context/context";

const Navbar = ({ className }: IMenu) => {
  const { isDark } = useContext(ThemeContext);
  const { closeMenu } = useContext(BurgerMenuContext);
  const location = useLocation();
  const isLogged = useSelector((state: State) => state.user.isLogged);

  const linkClassName =
    () =>
    ({ isActive }: { isActive: boolean }) =>
      isActive
        ? `${styles.navbar__item} ${styles.active}`
        : styles.navbar__item;

  const isAuthPage = useMemo(
    () => location.pathname === "/sign-in" || location.pathname === "/sign-up",
    [location.pathname]
  );

  return (
    <>
      {isAuthPage ? null : (
        <div className={`${styles.navbar} ${className}`}>
          <div className={styles.navbar__list}>
            <NavLink className={linkClassName()} to="/" onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink
              className={linkClassName()}
              to="/trends"
              onClick={closeMenu}
            >
              Trends
            </NavLink>

            {isLogged ? (
              <NavLink
                className={linkClassName()}
                to="/favorites"
                onClick={closeMenu}
              >
                Favorites
              </NavLink>
            ) : (
              <NavLink
                className={linkClassName()}
                to="/sign-in"
                onClick={closeMenu}
              >
                Favorites
              </NavLink>
            )}
            <NavLink
              className={linkClassName()}
              to="/settings"
              onClick={closeMenu}
            >
              Settings
            </NavLink>
          </div>
          <span
            className={styles.navbar__copyright}
            style={isDark ? {} : { color: "#000" }}
          >
            © All Rights Reserved
          </span>
        </div>
      )}
    </>
  );
};

export default Navbar;
