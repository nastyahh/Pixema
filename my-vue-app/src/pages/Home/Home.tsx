import { useEffect } from "react";
import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../store/moviesSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";

const Home = () => {
  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();
  useEffect(() => {
    dispatch(getMovies());
  }, []);

  const data = useSelector((state) => state.movies.movies);
  console.log(data);
  return <div className={styles.movies}></div>;
};

export default Home;
