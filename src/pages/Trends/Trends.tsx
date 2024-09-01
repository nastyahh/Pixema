import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrends } from "../../store/moviesSlice";
import Movies from "../../ui-components/Movies/Movies";
import styles from "./Trends.module.scss";
import "../../scss/_global.scss";
import { State } from "../../utility/types";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";

const Trends = () => {
  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();
  const trends = useSelector((state: State) => state.movies.trends);
  const status = useSelector((state: State) => state.movies.trendsStatus);

  useEffect(() => {
    if (trends.length === 0) {
      dispatch(getTrends());
    }
  }, []);
  return (
    <div className={styles.trends}>
      {status === "loading" ? (
        <div className="spinner__wrapper">
          <span className="spinner"></span>
        </div>
      ) : (
        <div className={styles.trends__wrapper}>
          <Movies data={trends} movieInfos={trends} />
        </div>
      )}
    </div>
  );
};

export default Trends;
