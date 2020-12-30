import { useEffect, useState } from "react";
import * as DATA from "../utils/data";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './movie_details.scss';

let movie = [];
//let movieVideos = [];

const MovieDetails = (props) => {
  const [loadingError, setLoadingState] = useState(true);

  useEffect(() => {
    async function getmovieDetails() {
      var url =
        "https://api.themoviedb.org/3/movie/" +
        props.data.match.params.id +
        "?api_key=" +
        DATA.API_KEY +
        "&language=en-US&append_to_response=videos";
      await axios
        .get(url)
        .then((response) => {
          movie = response.data;
          console.log("inside response");
          console.log(movie);
          //   movieVideos = movie.videos.results;
          setLoadingState(false);
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {});
    }
    getmovieDetails();
  }, [props.data.match.params.id]);

  function Genres(props) {
    const genreList = props.genres.map((genre, index) => (
      <span key={genre.id}>
            { index+1 < props.genres.length 
            ? <p> {genre.name},</p>
            : <p> {genre.name} </p> }
     
      </span>
    ));

    return genreList;
  }

  function Rating(props) {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(
        <span>
          {i + 1 <= Math.round(props.rating) ? (
            <FontAwesomeIcon key={i} icon="star" color="yellow" />
          ) : (
            <FontAwesomeIcon key={i} icon="star" color="gray" />
          )}
        </span>
      );
    }
    return arr;
  }

  console.log(props.data);
  return (
    <div>
      {loadingError 
      ? (<div> loading </div> ) 
      : (
        <div className="container">
          <div className="row first-row">
            <div className="col-12   col-lg-4">
              {movie.poster_path
               ? (<img className="poster-image img-fluid "
                  src={DATA.IMAGE_PATH + movie.poster_path}
                  alt=""/> )
               : (
                <img
                  className="poster-image img-fluid "
                  src="../src/assets/imgs/alt.jpg"
                  alt="" />)}
            </div>
            <div className="col-12 col-lg-8  movie-meta">
              <div className="row d-flex justify-content-center movie-name-row">
                <h1> {movie.title}</h1>
              </div>

              <div className="row d-flex justify-content-center movie-year-row">
                <h3> {movie.release_date.slice(0, 4)}</h3>
              </div>

              <div className="row d-flex justify-content-center movie-genre-row">
                <Genres genres={movie.genres} />
              </div>

              <div className="row d-flex justify-content-center rating-row">
                <div className="rating-col">
                  <div className="rate-val">
                    <span className="val"> {movie.vote_average} </span>
                    <span className="out-of">&frasl;10</span>
                  </div>
                </div>

                <div className="rate-star">
                  <Rating rating={movie.vote_average} />
                </div>
              </div>

              <div className="row d-flex justify-content-center text center overview-row">
                <div className="col justify-self-center">
                  <h6>Overview</h6>
                  <p>{movie.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
