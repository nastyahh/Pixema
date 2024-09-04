import { useContext, useEffect, useRef } from "react";
import Profile from "../../ui-components/Profile/Profile";
import styles from "./Menu.module.scss";
import { BurgerMenuContext } from "../../Context/context";
import Navbar from "../Navbar/NavBar";

const Menu = () => {
  const { isMenuOpen, toggleMenu } = useContext(BurgerMenuContext);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        toggleMenu();
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, toggleMenu]);

  return (
    <div
      ref={menuRef}
      className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}
    >
      <Profile className={styles.profile} />
      <Navbar className={styles.navbarMenu} />
    </div>
  );
};

export default Menu;
