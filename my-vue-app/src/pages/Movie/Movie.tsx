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
import Movies from "../../ui-components/Movies/Movies";
import { ReactComponent as PrevIcon } from "../../assets/arrow-prev.svg";

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
    dots: false,
    mouseDrag: true,
    lazyLoad: true,
    navText: [
      `
      <div class="${styles.customNavBtn} ${styles.owlPrevSlide}">
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2071 17.7071C9.81658 18.0976 9.18342 18.0976 8.79289 17.7071L3.79289 12.7071C3.40237 12.3166 3.40237 11.6834 3.79289 11.2929L8.79289 6.29289C9.18342 5.90237 9.81658 5.90237 10.2071 6.29289C10.5976 6.68342 10.5976 7.31658 10.2071 7.70711L6.91421 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H6.91421L10.2071 16.2929C10.5976 16.6834 10.5976 17.3166 10.2071 17.7071Z" fill="#AFB2B6"/>
       </svg>
     </div>`,
      `<div class="${styles.customNavBtn} ${styles.owlNextSlide}">
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7929 6.29289C14.1834 5.90237 14.8166 5.90237 15.2071 6.29289L20.2071 11.2929C20.5976 11.6834 20.5976 12.3166 20.2071 12.7071L15.2071 17.7071C14.8166 18.0976 14.1834 18.0976 13.7929 17.7071C13.4024 17.3166 13.4024 16.6834 13.7929 16.2929L17.0858 13L3 13C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11L17.0858 11L13.7929 7.70711C13.4024 7.31658 13.4024 6.68342 13.7929 6.29289Z" fill="#AFB2B6"/>
       </svg>
     </div>`,
    ],
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
        <div className={styles.movieInfo}>
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
                  <button
                    onClick={handleAddFavorite}
                    className={styles.btnFavorite}
                  >
                    <Favorite />
                  </button>
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      copyTextToClipboard(url);
                    }}
                    className={styles.btnShare}
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
                  <ul className={styles.movie__details__characteristics}>
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
            {/* <h3 className={styles.movie__recommend}>Recommendations</h3>
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
          </div> */}
          </div>

          <div className={styles.carousel}>
            <h3 className={styles.movie__recommend}>Recommendations</h3>
            {recommend.length > 0 ? (
              <>
                <OwlCarousel className="owl-theme" {...options}>
                  {recommend.map((movie, index) => {
                    if (parseFloat(movie.imdbRating) > 7.0) {
                      return <Movies data={recommend} movieInfos={recommend} />;
                    } else {
                      return null;
                    }
                  })}
                </OwlCarousel>
              </>
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
