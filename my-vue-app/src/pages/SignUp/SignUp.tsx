import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../SignIn/SignIn.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getUser, getUserProfile } from "../../store/userSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";

const SignUp = () => {
  const [userSignUp, setUserSignUp] = useState({
    username: "",
    email: "",
    password: "",
    course_group: 7,
  });

  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage =
    (location.state && location.state.from && location.state.from.pathname) ||
    "/";

  const InputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserSignUp({
      ...userSignUp,
      [name]: value,
    });
  };

  const handleSignUp = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createUser(userSignUp)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(
          getUser({ email: userSignUp.email, password: userSignUp.password })
        ).then((login) => {
          if (login.meta.requestStatus === "fulfilled") {
            dispatch(getUserProfile()).then((profileResult) => {
              if (profileResult.meta.requestStatus === "fulfilled") {
                navigate(fromPage);
              }
            });
          }
        });
      }
    });
  };

  return (
    <form className={styles.signIn} onSubmit={handleSignUp}>
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
      <input
        type="password"
        name="password"
        value={userSignUp.password}
        onChange={InputChange}
        placeholder="Your password"
      />
      <button type="submit" className={styles.signIn__btn}>
        Sign up
      </button>
      <p className={styles.signIn__registration}>
        Already have an account?<Link to="/sign-in"> Sign In</Link>
      </p>
    </form>
  );
};

export default SignUp;
