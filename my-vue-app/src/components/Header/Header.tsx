import "../../App.css";
import styles from "./Header.module.scss";
import { ReactComponent as Logo } from "../../assets/pixemaLogo.svg";
import { ReactComponent as Filter } from "../../assets/filter.svg";
import Profile from "../../ui-components/Profile/Profile";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__container}`}>
        <div className={styles.header__logo}>
          <Logo />
        </div>
        <div className={styles.header__search}>
          <input
            type="text"
            placeholder="Search"
            className={styles.header__search__input}
          />
          <button className={styles.header__search__filter}>
            <Filter />
          </button>
        </div>{" "}
        <Profile />
      </div>
    </header>
  );
};

export default Header;
