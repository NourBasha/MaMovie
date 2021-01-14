import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import * as DATA from "../../utils/data";
import img from "../../assets/imgs/alt.jpg";


const MovieCard= (props) => {
    const movieList = props.movieList.map((movie, index) => (
      <span
        key={movie.id}
        className="poster-container col-6 col-md-4 col-lg-3 p-0  p-md-1 p-lg-2 "
      >
          <div className="rating">
                <span className="top-span">
                  <FontAwesomeIcon  icon="star"   className="next mr-1" color="yellow" />
                  { movie.vote_average }</span>
                  <span style={{'fontSize':15+'px'}}>&frasl;10</span>
              </div>


              <div className="title justify-content-center ">
                <span> { movie.title } </span>
              </div>

        
              <div className="release_date">
                      {movie.release_date ? (
                    <span> {movie.release_date.slice(0, 4)} </span>
                ) : (
                    <p style={{ display: "none" }}></p>
                )}
                </div>



                <Link to={{ pathname: "/movie/" + movie.id }}>
           {movie.poster_path !== null && movie.poster_path !== "" ? (
             <img
               className="poster-image"
               src={DATA.IMAGE_PATH + movie.poster_path}
               alt=""
             />
           ) : (
             <img className="poster-image" src={img} alt="" />
           )}
         </Link>

               
      </span>
    ));

    return movieList;
  }

export default MovieCard;