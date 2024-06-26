import { useContext } from "react";
import styles from "./Settings.module.scss";
import { ThemeContext } from "../../Context/context";

const Settings = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      settings
      <label className={styles.switch}>
        <input type="checkbox" onChange={toggleTheme} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
};

export default Settings;
