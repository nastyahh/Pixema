import { useDispatch } from "react-redux";
import styles from "../SignIn/SignIn.module.scss";
import { useContext, useState } from "react";
import { resetPasswordConfirm } from "../../store/userSlice";
import { ReactComponent as Info } from "../../assets/info.svg";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../Context/context";
import InputPassword from "../../ui-components/InputPassword/InputPassword";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";

const PasswordConfirm = () => {
  const { isDark } = useContext(ThemeContext);
  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    uid: "",
    token: "",
    newPassword: "",
  });
  const [activeHint, setActiveHint] = useState("");

  const toggleHint = (hintName: string) => {
    if (activeHint === hintName) {
      setActiveHint("");
    } else {
      setActiveHint(hintName);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(resetPasswordConfirm(passwordData)).then((result) => {
      console.log(result);
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/sign-in");
      }
    });
  };
  return (
    <form
      className={`${styles.signIn}  ${isDark ? "" : styles.light}`}
      onSubmit={handleSubmit}
    >
      <h3 className={styles.signIn__title}>Reset password</h3>
      <div className={styles.infoWrap}>
        <label htmlFor="">Uid</label>
        <button
          type="button"
          className={styles.info__btn}
          onClick={() => toggleHint("uid")}
        >
          <Info />
        </button>
      </div>
      <div className={styles.inputWrap}>
        <input
          type="text"
          name="uid"
          placeholder="Your uid"
          onChange={handleInput}
          value={passwordData.uid}
        />
        {activeHint === "uid" && (
          <div className={styles.hint}>
            You need to insert highlighted part of the link
            .../password/reset/confirm/
            <span className={styles.hint__highlight}>ODMxNw</span>/...
          </div>
        )}
      </div>

      <div className={`${styles.infoWrap} ${styles.token}`}>
        <label htmlFor="">Token</label>
        <button
          type="button"
          className={styles.info__btn}
          onClick={() => toggleHint("token")}
        >
          <Info />
        </button>
      </div>
      <div className={styles.inputWrap}>
        <input
          type="text"
          name="token"
          placeholder="Your token"
          onChange={handleInput}
          value={passwordData.token}
        />
        {activeHint === "token" && (
          <div className={styles.hint}>
            {" "}
            You need to insert highlighted part of the link
            .../password/reset/confirm/ODMxNw/
            <span className={styles.hint__highlight}>cbhpfn-39e983f53e...</span>
          </div>
        )}
      </div>
      <label htmlFor="">New password</label>
      <InputPassword
        name="newPassword"
        value={passwordData.newPassword}
        onChange={handleInput}
        placeholder="Your new password"
      />
      <button type="submit" className={styles.signIn__btn}>
        Reset Password
      </button>
    </form>
  );
};

export default PasswordConfirm;
