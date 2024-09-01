import { useContext, useState } from "react";
import styles from "./Settings.module.scss";
import { ThemeContext } from "../../Context/context";
import { useDispatch, useSelector } from "react-redux";
import { setPassword } from "../../store/settingsSlice";
import { Link } from "react-router-dom";
import "../../scss/_global.scss";
import { State } from "../../utility/types";

const Settings = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const userData = useSelector((state: State) => state.user.profile);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleCancel = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsFocused(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = passwordData;
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    dispatch(setPassword({ currentPassword, newPassword, confirmPassword }));
  };

  if (!userData) {
    return (
      <div
        className={`${styles.settings} ${styles.unauthorized} ${
          isDark ? "" : styles.light
        }`}
      >
        <h2 className={styles.settings__login_text}>
          You need to{" "}
          <Link to="/sign-in" className={styles.settings__login}>
            log in
          </Link>
        </h2>
      </div>
    );
  }

  return (
    <form
      className={`${styles.settings} ${isDark ? "" : styles.light}`}
      onSubmit={handleSubmit}
    >
      <div className={`${styles.settings_profile} ${styles.settings_section}`}>
        <h2 className={styles.settings_title}>Profile</h2>
        <div className={styles.settings_subform}>
          <div className={styles.settings_inputWrap}>
            <label>Name</label>
            <input type="text" placeholder={userData.username} disabled />
          </div>
          <div className={styles.settings_inputWrap}>
            <label htmlFor="">Email</label>
            <input type="text" placeholder={userData.email} disabled />
          </div>
        </div>
      </div>
      <div className={`${styles.settings_password} ${styles.settings_section}`}>
        <h2 className={styles.settings_title}>Password</h2>
        <div className={styles.settings_subform}>
          <div className={styles.settings_inputWrap}>
            <label htmlFor="">Password</label>
            <input
              name="currentPassword"
              type="password"
              placeholder="Your password"
              value={passwordData.currentPassword}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div className={styles.settings_inputWrap}>
            <label htmlFor="">New Password</label>
            <input
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <label htmlFor="">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={passwordData.confirmPassword}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>
      </div>
      <div className={`${styles.settings_mode} ${styles.settings_section}`}>
        <h2 className={styles.settings_title}>Color mode</h2>
        <div className={`${styles.settings_subform} ${styles.theme}`}>
          {isDark ? (
            <div className={styles.settings_modeTheme}>
              <label className={styles.settings_modeTheme__name}>Dark</label>
              <p>Use dark thema</p>
            </div>
          ) : (
            <div className={styles.settings_modeTheme}>
              <label className={styles.settings_modeTheme__name}>Light</label>
              <p>Use light thema</p>
            </div>
          )}
          <label className={styles.switch}>
            <input type="checkbox" onChange={toggleTheme} checked={isDark} />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
      </div>

      <div className={styles.settings__actions}>
        <button
          type="button"
          className={styles.settings__btnCancel}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={styles.settings__btnSave}>
          Save
        </button>
      </div>
    </form>
  );
};

export default Settings;
