import { Link, useNavigate } from "react-router-dom";
import styles from "../SignIn/SignIn.module.scss";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../store/userSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { ReactComponent as Arrow } from "../../assets/arrow-prev.svg";
import { ThemeContext } from "../../Context/context";
import InputPassword from "../../ui-components/InputPassword/InputPassword";

const SignUp = () => {
  const { isDark } = useContext(ThemeContext);
  const [userSignUp, setUserSignUp] = useState({
    username: "",
    email: "",
    password: "",
    course_group: 7,
  });

  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();
  const navigate = useNavigate();

  const InputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserSignUp({
      ...userSignUp,
      [name]: value,
    });
  };

  const handleSignUp = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      createUser({
        signUpObj: userSignUp,
        callback: () => navigate("/confirmation"),
      })
    );
  };

  return (
    <form
      className={`${styles.signIn} ${isDark ? "" : styles.light}`}
      onSubmit={handleSignUp}
    >
      <Link to="/" className={styles.signIn_back}>
        <Arrow />
      </Link>
      <h3 className={styles.signIn__title}>Sign Up</h3>
      <label htmlFor="">Name</label>
      <input
        type="text"
        name="username"
        value={userSignUp.username}
        onChange={InputChange}
        placeholder="Your name"
      />
      <label htmlFor="">Email</label>
      <input
        type="email"
        name="email"
        value={userSignUp.email}
        onChange={InputChange}
        placeholder="Your email"
      />
      <label htmlFor="">Password</label>
      <InputPassword value={userSignUp.password} onChange={InputChange} />
      <button type="submit" className={styles.signIn__btn}>
        Sign up
      </button>
      <p className={styles.signIn__registration}>
        Already have an account?
        <Link to="/sign-in" className={styles.signIn__registrationLink}>
          {" "}
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
