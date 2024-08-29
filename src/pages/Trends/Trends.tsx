import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrends } from "../../store/moviesSlice";
import Movies from "../../ui-components/Movies/Movies";
import styles from "./Trends.module.scss";
import "../../scss/_global.scss";

const Trends = () => {
  const dispatch = useDispatch();
  const trends = useSelector((state) => state.movies.trends);
  const status = useSelector((state) => state.movies.trendsStatus);

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
