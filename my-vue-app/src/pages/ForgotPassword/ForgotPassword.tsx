import { useState } from "react";
import styles from "../SignIn/SignIn.module.scss";
import { resetPassword } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const InputChange = (event) => {
    setEmail(event.target.value);
    if (event.target.value) {
      setError("");
    }
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setError("Please, enter your mail");
      return;
    }
    dispatch(resetPassword(email)).then((result) => {
      console.log(result);
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/reset-password-confirm");
      }
    });
  };

  return (
    <form
      className={`${styles.signIn} ${styles.resetPassword}`}
      onSubmit={handleSubmit}
    >
      <h3 className={styles.signIn__title}>Reset password</h3>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={InputChange}
        placeholder="Your email"
        className={`${error ? styles.invalidInput : ""}`}
      />
      {email.length === 0 ? <p className={styles.errorMessage}>{error}</p> : ""}
      <button type="submit" className={styles.signIn__btn}>
        Reset Password
      </button>
    </form>
  );
};

export default ForgotPassword;
