import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchRecommendedMovies, getMovieInfo } from "../../store/moviesSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { ReactComponent as Share } from "../../assets/share-icon.svg";
import { ReactComponent as Favorite } from "../../assets/navbar/favorites-icon.svg";
import { ReactComponent as IMDB } from "../../assets/imdb-icon.svg";
import styles from "./Movie.module.scss";
import { addFavoriteMovie } from "../../store/favoritesSlice";

const Movie = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();
  const location = useLocation();
  const status = useSelector((state) => state.movies.movieInfoStatus);

  const recommend = useSelector((state) => state.movies.recommendedMovies);
  const recommedStatus = useSelector(
    (state) => state.movies.recommendedMoviesStatus
  );

  console.log("infos movie", recommend);
  useEffect(() => {
    dispatch(getMovieInfo(imdbID));
    dispatch(fetchRecommendedMovies());
  }, [dispatch, imdbID]);

  console.log("rec", recommend);
  const isLogged = useSelector((state) => state.user.isLogged);
  const navigate = useNavigate();

  const movieInfo = useSelector((state) => state.movies.movieInfo);
  const modifyGenre =
    movieInfo && movieInfo.Genre ? movieInfo.Genre.split(",").join(" •") : "";

  const options = {
    items: 4,
    margin: 40,
    loop: true,
    nav: true,
    mouseDrag: true,
    responsive: {
      1920: {
        items: 4,
      },
    },
  };

  const handleAddFavorite = () => {
    if (isLogged) {
      dispatch(addFavoriteMovie(movieInfo));
    } else {
      navigate("/sign-in", { state: { from: location } });
    }
  };

  const shareMessageRef = useRef<HTMLDivElement | null>(null);

  const copyTextToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

      if (shareMessageRef.current !== null) {
        shareMessageRef.current.classList.add(styles.show);
        setTimeout(() => {
          if (shareMessageRef.current) {
            shareMessageRef.current.classList.remove(styles.show);
          }
        }, 1500);
      }
    } catch (err) {
      console.error("Ошибка:", err);
    }
  };

  return (
    <>
      {status === "loading" ? (
        <div className={styles.spinner__wrapper}>
          <span className={styles.spinner}></span>
        </div>
      ) : (
        <div className={styles.movie__wrapper}>
          <div className={styles.shareMessage} ref={shareMessageRef}>
            Url is copied!
          </div>
          <div className={styles.movie}>
            <div className={styles.movie__preview}>
              <div className={styles.movie__poster}>
                <img src={movieInfo.Poster} alt="Film Poster" />
              </div>
              <div className={styles.movie__preview__actions}>
                <button onClick={handleAddFavorite}>
                  <Favorite />
                </button>
                <button
                  onClick={() => {
                    const url = window.location.href;
                    copyTextToClipboard(url);
                  }}
                >
                  <Share />
                </button>

                {/* {isLogged ? (
                  <button onClick={() => dispatch(addFavoriteMovie(movieInfo))}>
                    <Favorite />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/sign-in");
                    }}
                  >
                    <Favorite />
                  </button>
                )}

                <button>
                  <Share />
                </button> */}
              </div>
            </div>
            <div className={styles.movie__desc}>
              <div className={styles.movie__genre}>{modifyGenre}</div>
              <h1 className={styles.movie__title}>{movieInfo.Title}</h1>
              <div className={styles.movie__rating}>
                <div className={styles.movie__rating__number}>
                  {movieInfo.imdbRating}
                </div>
                <div className={styles.movie__rating__imdb}>
                  <IMDB />
                  {movieInfo.imdbRating}
                </div>
                <div className={styles.movie__rating__time}>
                  {movieInfo.Runtime}
                </div>
              </div>
              <p className={styles.movie__plot}>{movieInfo.Plot}</p>
              <div className={styles.movie__details}>
                <ul>
                  <li>Year</li>
                  <li>Released</li>
                  <li>BoxOffice</li>
                  <li>Country</li>
                  <li>Production</li>
                  <li>Actors</li>
                  <li>Director</li>
                  <li>Writers</li>
                </ul>
                <ul>
                  <li>{movieInfo.Year}</li>
                  <li>{movieInfo.Released}</li>
                  <li>{movieInfo.BoxOffice}</li>
                  <li>{movieInfo.Country}</li>
                  <li>{movieInfo.Production}</li>
                  <li>{movieInfo.Actors}</li>
                  <li>{movieInfo.Director}</li>
                  <li>{movieInfo.Writer}</li>
                </ul>
              </div>
            </div>
          </div>
          <h3 className={styles.movie__recommend}>Recommendations</h3>
          <div className={styles.carousel}>
            {recommend.length > 0 ? (
              <OwlCarousel className="owl-theme" {...options}>
                {recommend.map((movie, index) => {
                  if (parseFloat(movie.imdbRating) > 7.0) {
                    return (
                      <div key={index} className="item">
                        <img src={movie.Poster} alt="" />
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </OwlCarousel>
            ) : (
              <p>Loading recommended films...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
