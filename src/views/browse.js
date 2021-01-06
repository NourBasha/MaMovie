import axios from "axios";
import { useEffect, useContext, useRef, useCallback } from "react";
import Context from "../utils/context";
import * as DATA from "../utils/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./browse.scss";
import img from "../assets/imgs/alt.jpg";


let movieList = [];
let paging = [1, 2, 3];
let genresList = [];

const Browse = () => {


  const context = useContext(Context);
  const refContext = useRef(useContext(Context));

useEffect(()=>{  
  //  document.getElementsByClassName('header')[0].style.backgroundColor = '#202429b6'
},[])
  
const  handlePagingHighlights = useCallback(()=>{
  

  if (paging[0] === 1) {
    document.getElementsByClassName("prev-page-item")[1].classList.add("muted");
  } else {
    document.getElementsByClassName("prev-page-item")[1].classList.remove("muted");
  }

  if(context.currentPageBrowse === movieList.total_pages){

    if(context.currentPageBrowse === paging[0]){
      document.getElementsByClassName("middle-page")[0].classList.add("muted");
      document.getElementsByClassName("last-page")[0].classList.add("muted");
      document.getElementsByClassName("next-page-item")[1].classList.add("muted");
    } else if(context.currentPageBrowse === paging[1]){
      document.getElementsByClassName("last-page")[0].classList.add("muted");
      document.getElementsByClassName("next-page-item")[1].classList.add("muted");
    }else if(context.currentPageBrowse === paging[1]){
      document.getElementsByClassName("next-page-item")[1].classList.add("muted");
    }

  }



  if(context.currentPageBrowse === paging[0]){
    if(!document.getElementsByClassName("first-page")[0].classList.contains('active')){
      document.getElementsByClassName("first-page")[0].classList.add("active");
      document.getElementsByClassName("middle-page")[0].classList.remove("active");
      document.getElementsByClassName("last-page")[0].classList.remove("active");
    }
  }

   if(context.currentPageBrowse === paging[1]){

    if(!document.getElementsByClassName("middle-page")[0].classList.contains('active')){
      document.getElementsByClassName("middle-page")[0].classList.add("active");
      document.getElementsByClassName("first-page")[0].classList.remove("active");
      document.getElementsByClassName("last-page")[0].classList.remove("active");
    }
  }
   if(context.currentPageBrowse === paging[2]){

    if(!document.getElementsByClassName("last-page")[0].classList.contains('active')){
      document.getElementsByClassName("last-page")[0].classList.add("active");
      document.getElementsByClassName("first-page")[0].classList.remove("active");
      document.getElementsByClassName("middle-page")[0].classList.remove("active");
    }
  }
 
},[context.currentPageBrowse]);


const muteExtraPages= useCallback (() => {

  if (movieList.total_pages <= context.currentPageBrowse + 2) {
    switch (movieList.total_pages) {
      case context.currentPageBrowse: {
        document
          .getElementsByClassName("middle-page")[0]
          .classList.add("muted");
        document
          .getElementsByClassName("last-page")[0]
          .classList.add("muted");
        break;
      }
      case context.currentPageBrowse + 1: {
        document
          .getElementsByClassName("last-page")[0]
          .classList.add("muted");
        break;
      }
      case context.currentPageBrowse + 2: {
        document
          .getElementsByClassName("next-page-item")[0]
          .classList.add("muted");
        break;
      }
      default : break;
    }
  } else {
    document
      .getElementsByClassName("middle-page")[0]
      .classList.remove("muted");
    document.getElementsByClassName("last-page")[0].classList.remove("muted");
    document
      .getElementsByClassName("next-page-item")[0]
      .classList.remove("muted");
  }

},[context.currentPageBrowse]);

 const requestNewPageWithFilter = useCallback(()=>{

  let url =
  "https://api.themoviedb.org/3/discover/movie?api_key=" +
  DATA.API_KEY +
  "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false" +
  "&page="+context.currentPageBrowse;



  if (context.browseFilterType.genre === true) {
    // genres filter
    if(!context.browseGenresLoading){
      let selectGenre = document.getElementsByClassName("genre-filter")[0]
      .value;

      if (selectGenre !== "0") {
        url = url + "&with_genres=" + selectGenre;
      }
  }
  }
if (context.browseFilterType.year === true) {
  // year filter
  let selectYear = document.getElementsByClassName("year-filter")[0].value;
  if (selectYear !== "0") {
    url =
      url +
      "&primary_release_date.gte=" +
      selectYear +
      "-01-01&primary_release_date.lte=" +
      selectYear +
      "-12-31";
  }
}

if (context.browseFilterType.rating === true) {
  // rating filter
  let selectRating = document.getElementsByClassName("rating-filter")[0]
    .value;
  url = url + "&vote_average.gte=" + selectRating;
}

if(context.browseFilterType.movieName === true ){
  let movieName = context.browseFilterType.movieNamePick;
 if(movieName !== undefined && movieName !==''){
  document.getElementsByClassName("filter-search-input")[0].value =movieName;
  movieName = movieName.split(" ").join("+"); 
  url = "https://api.themoviedb.org/3/search/movie?api_key="+DATA.API_KEY+
      "&query="+movieName+"&page="+context.currentPageBrowse;
 }
}

refContext.current.dispatchBrowseLoadTrue();


 axios
.get(url)
.then((response) => {
  if (movieList.results) {
    movieList = [];
  }
  movieList = response.data;
  for (let i = 0; i < movieList.results.length; i++) {
    if (movieList.results[i].release_date) {
      movieList.results[i].release_date = movieList.results[
        i
      ].release_date.slice(0, 4);
    }
  }
  refContext.current.dispatchBrowseLoadFalse();
  muteExtraPages();
   
  movieList.url = response.config.url;
  refContext.current.setBrowseResponseUrl(movieList.url);
  refContext.current.setBrowseApiResponse(movieList);
  refContext.current.updateBrowseResponseExpireTime(new Date().getTime()+(60*1000));
})
.catch((error) => {
})
.finally(() => {
})

},[  context.browseFilterType.genre, 
     context.browseFilterType.year,
     context.browseFilterType.rating , 
     context.browseFilterType.movieName,
     context.browseFilterType.movieNamePick,
     context.browseGenresLoading,
     muteExtraPages,
     context.currentPageBrowse ]);

const getMovies = useCallback(()=>{

       
      axios.get("https://api.themoviedb.org/3/discover/movie?api_key=" +
          DATA.API_KEY +
          "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false" +
          "&page=" +
          context.currentPageBrowse
      )
      .then((response) => {
        if (response.data) {
          if (movieList.results) {
            movieList = [];
          }
          movieList = response.data;

          if (refContext.current.browseMoviesLoading !== false) {
            refContext.current.dispatchBrowseLoadFalse();
          }
        
          movieList.url = response.config.url;
          refContext.current.setBrowseResponseUrl(movieList.url);
          refContext.current.setBrowseApiResponse(movieList);
          refContext.current.updateBrowseResponseExpireTime(new Date().getTime()+(60*1000));

        }
      })
      .catch((error) => {
      })
      .finally(() => {});
     },[context.currentPageBrowse])



     useEffect(()=>{

      if(localStorage.getItem('genres') === null){

        refContext.current.browseSetGenresLoading(true);

        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${DATA.API_KEY}&language=en-US`)
        .then((results) => {
          if (results.data.genres) {
            genresList = results.data.genres;
            refContext.current.browseSetGenresLoading(false);
            localStorage.setItem('genres',JSON.stringify(genresList));
            }
          })
          .catch((err) => {
            alert(err);
          })
          .finally(() => {});
      }else {
            genresList = JSON.parse(localStorage.getItem('genres') || [] );
      }

  
     },[])


    useEffect(() => {

  

    if(refContext.current.browseResponseExpireTime > new Date().getTime() 
            && refContext.current.browseResponseUrl===movieList.url){ // Still valid response 
      movieList = refContext.current.browseApiResponse;
    }else{ // response expired
          if(context.browseFilterOnState){
            requestNewPageWithFilter(); 
          }
          else{ // no filters
            getMovies();
          }
  
      }

   
   handlePagingHighlights();


  },   [context.currentPageBrowse,
       context.browseFilterOnState,
       handlePagingHighlights,
       requestNewPageWithFilter,
       getMovies,
      ]);

 

  function Genres() {
    
    return (
      <select
        className="custom-select genre-filter"
        onChange={searchByGenre}
        value={context.browseFilterType.genrePick}
      >
        <option value="-1" defaultValue disabled>
          Genres
        </option>
        <option value="0">All</option>
        {genresList.map((genre, index) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    );
  }

  function Year() {
    let years = [];
    let currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
      years.push(i);
    }
    return (
      <select
        className="custom-select year-filter"
        value={context.browseFilterType.yearPick}
        onChange={searchByYear}
      >
        <option value="-1" defaultValue disabled>
          Year
        </option>
        <option value="0">All</option>

        {years.map((year, index) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    );
  }

  function Rating() {
    let arr = [];

    for (let index = 1; index <= 10; index++) {
      if (index === 1) {
        arr.push(
          <option key={index - 1} value="0" defaultValue disabled>
            Rating
          </option>
        );
      }
      if (index === 10) {
        arr.push(
          <option key={index} value={index}>
            {index}
          </option>
        );
      } else {
        arr.push(
          <option key={index} value={index}>
            {index}&#43;
          </option>
        );
      }
    }

    return (
      <select
        className="custom-select rating-filter"
        value={context.browseFilterType.ratingPick}
        onChange={searchByRating}
      >
        {arr}
      </select>
    );
  }

  function MovieCard(props) {
    const list = props.movies.map((movie, index) => (
      <span
        key={movie.id}
        className="col-6 col-md-4 col-lg-3 movie-col"
        style={{ margin: 0, padding: 0 }}
      >
        <div className="rating">
          <span className="top-span">
            <FontAwesomeIcon icon="star" className="next" color="yellow" />
            {movie.vote_average}
          </span>
          <span style={{ fontSize: 15 + "px" }}>&frasl;10</span>
        </div>

        <div className="title">
          <span> {movie.title} </span>
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

    return list;
  }

 
  return (
    <div className="browse " >
      <div className="container-fluid">

        {/* start of filter*/}
        <div className="filter text-center">
          <h3>Browse Movies</h3>
          {/*first row*/}
          <div className="row">
            <div className="col-6 col-md-4  col-lg-3">
              {!context.browseGenresLoading ? (
                <Genres />
              ) : (
                <div className="text-center">
                  <div className="spinner-border text-info m-5 "
                        style={{width:'4rem', height:'4rem'}} role="status">
                      </div>
              </div>
              )}
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <Year />
            </div>
            <div className="col-12 col-md-4 col-lg-3">
              <Rating />
            </div>
            <div className="col-10 offset-1  col-md-6 offset-md-3 offset-lg-0 col-md-4 col-lg-4">
              <form
                onSubmit={searchButton}
                className="form-inline my-2 my-lg-0 myform mt-3 mt-lg-0"
              >
                <input
                  className="form-control  mr-sm-2 filter-search-input"
                  type="search"
                  placeholder="Movie Name"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-info  my-2 my-sm-0"
                  type="submit"
                >Search
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* end of filter*/}

        {/* start of movies fetch*/}

        {/*second row*/}
        <div className="row movie-row d-flex justify-content-center">
          {context.browseMoviesLoading !== true ? (
            movieList.results ? (
              <MovieCard movies={movieList.results} />
            ) : (
              <p>Error</p>
            )
          ) : (
            <div className="text-center">
                <div className="spinner-border text-info m-5 "
                      style={{width:'4rem', height:'4rem'}} role="status">
                    </div>
              </div>
          )}
        </div>

        {/* end of movies fetch*/}
      </div>

      <nav aria-label=" Page navigation paging">
        <ul className="pagination justify-content-center paging ">
          <li className="page-item prev-page-item" onClick={prevPageClick}>
            <button
              className="page-link prev-page prev-page-item"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          <li
            className="page-item paging-item first-page active"
            onClick={changeFirst}
          >
            <button className="page-link first-a">{paging[0]}</button>
          </li>
          <li
            className="page-item paging-item middle-page"
            onClick={changeMiddle}
          >
            <button className="page-link middle-a">{paging[1]}</button>
          </li>
          <li className="page-item paging-item last-page" onClick={changeLast}>
            <button className="page-link last-a">{paging[2]}</button>
          </li>
          <li className="page-item next-page-item" onClick={nextPageClick}>
            <button
              className="page-link next-page next-page-item"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className="copyright mt-4 ">
        <div className=" text-left copy-right ">
          <div className="container">
            <p className="mb-0 mr-auto p-2">
              {" "}
              COPYRIGHT &copy; MaMovie | All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  async function searchByGenre(event) {
    // shut the movie search
    document.getElementsByClassName("filter-search-input")[0].value = "";
    context.browseSetFilterMovieNameOff(4); // 1 genre , 2 year , 3 rating , movie name
    context.browseSetFilterOn(); // filter applied >> true
    context.browseSetFilterGenreOn(
      1,
      event.target.options[event.target.selectedIndex].value
    ); // 1 genre , 2 year , 3 rating , movie name


    paging[0]= 1 ;
    paging[1]= 2 ;
    paging[2]= 3 ;
    context.changeBrowseCurrentPage(paging[0]);

    let url =
      "https://api.themoviedb.org/3/discover/movie?api_key=" +
      DATA.API_KEY +
      "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false" +
      "&page=" +
      context.currentPageBrowse;

    if (context.browseFilterType.year === true) {
      // year filter
      let selectYear = document.getElementsByClassName("year-filter")[0].value;
      if (selectYear !== "0") {
        url =
          url +
          "&primary_release_date.gte=" +
          selectYear +
          "-01-01&primary_release_date.lte=" +
          selectYear +
          "-12-31";
      }
    }

    if (context.browseFilterType.rating === true) {
      // rating filter
      let selectRating = document.getElementsByClassName("rating-filter")[0]
        .value;
      url = url + "&vote_average.gte=" + selectRating;
    }

    context.dispatchBrowseLoadTrue();
    await axios
      .get(
        event.target.value === "0"
          ? url
          : url + "&with_genres=" + event.target.value
      )
      .then((response) => {
        if (movieList.results) {
          movieList = [];
        }

        movieList = response.data;

        for (let i = 0; i < movieList.results.length; i++) {
          if (movieList.results[i].release_date) {
            movieList.results[i].release_date = movieList.results[
              i
            ].release_date.slice(0, 4);
          }
        }
        context.dispatchBrowseLoadFalse();
        muteExtraPages();

        movieList.url = response.config.url;
        context.setBrowseResponseUrl(movieList.url);
        context.setBrowseApiResponse(movieList);
        context.updateBrowseResponseExpireTime(new Date().getTime()+(60*1000));
      })
      .catch((error) => {
      
      })
      .finally(() => {
      });
  }

 async function searchByYear(event) {
    // shut the movie search
    document.getElementsByClassName("filter-search-input")[0].value = "";

    context.browseSetFilterMovieNameOff(4); // 1 genre , 2 year , 3 rating , movie name
    context.browseSetFilterOn(); // filter applied >> true

    context.browseSetFilterYearOn(
      2,
      event.target.options[event.target.selectedIndex].value
    ); // 1 genre , 2 year , 3 rating , movie name

    paging[0]= 1 ;
    paging[1]= 2 ;
    paging[2]= 3 ;
    context.changeBrowseCurrentPage(paging[0]);

    let url =
      "https://api.themoviedb.org/3/discover/movie?api_key=" +
      DATA.API_KEY +
      "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false" +
      "&page=" +
      context.currentPageBrowse;

    if (context.browseFilterType.genre === true) {
      // genres filter
      let selectGenre = document.getElementsByClassName("genre-filter")[0]
        .value;
    
      if (selectGenre !== "0") {

        url = url + "&with_genres=" + selectGenre;
      }
    }

    if (context.browseFilterType.rating === true) {
      let selectRating = document.getElementsByClassName("rating-filter")[0]
        .value;
      url = url + "&vote_average.gte=" + selectRating;
    }

    context.dispatchBrowseLoadTrue();
   await axios.get( event.target.value === "0"
          ? url
          : url +
              "&primary_release_date.gte=" +
              event.target.value +
              "-01-01&primary_release_date.lte=" +
              event.target.value +
              "-12-31"
      )
      .then((response) => {
        if (movieList.results) {
          movieList = [];
        }

        movieList = response.data;

        if (movieList.results) {
          for (let i = 0; i < movieList.results.length; i++) {
            movieList.results[i].release_date = movieList.results[
              i
            ].release_date.slice(0, 4);
          }
          muteExtraPages();
          context.dispatchBrowseLoadFalse();
        }

        movieList.url = response.config.url;
        context.setBrowseResponseUrl(movieList.url);
        context.setBrowseApiResponse(movieList);
        context.updateBrowseResponseExpireTime(new Date().getTime()+(60*1000));

      })
      .catch((error) => {
      
      })
      .finally(() => {
      });
  }

 async function searchByRating(event) {
    // shut the movie search
    document.getElementsByClassName("filter-search-input")[0].value = "";

    context.browseSetFilterMovieNameOff(4); // 1 genre , 2 year , 3 rating , movie name
    context.browseSetFilterOn(); // filter applied >> true
    context.browseSetFilterRatingOn(
      3,
      event.target.options[event.target.selectedIndex].value
    ); // 1 genre , 2 year , 3 rating , movie name

    paging[0]= 1 ;
    paging[1]= 2 ;
    paging[2]= 3 ;
    context.changeBrowseCurrentPage(paging[0]);

    let url =
      "https://api.themoviedb.org/3/discover/movie?api_key=" +
      DATA.API_KEY +
      "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false" +
      "&page=" +
      context.currentPageBrowse;

    if (context.browseFilterType.genre === true) {
      // genres filter
      let selectGenre = document.getElementsByClassName("genre-filter")[0]
        .value;
      if (selectGenre !== "0") {
        url = url + "&with_genres=" + selectGenre;
      }
    }

    if (context.browseFilterType.year === true) {
      // year filter
      let selectYear = document.getElementsByClassName("year-filter")[0].value;

      if (selectYear !== "0") {
        url =
          url +
          "&primary_release_date.gte=" +
          selectYear +
          "-01-01&primary_release_date.lte=" +
          selectYear +
          "-12-31";
      }
    }

    context.dispatchBrowseLoadTrue();

   await axios
      .get(url + "&vote_average.gte=" + event.target.value)
      .then((response) => {
        if (movieList.results) {
          movieList = [];
        }

        movieList = response.data;

        if (movieList.results) {
          for (let i = 0; i < movieList.results.length; i++) {
            if (movieList.results[i].release_date !== undefined) {
              movieList.results[i].release_date = movieList.results[
                i
              ].release_date.slice(0, 4);
            }
          }
          muteExtraPages();
          context.dispatchBrowseLoadFalse();
        }
        movieList.url = response.config.url;
        context.setBrowseResponseUrl(movieList.url);
        context.setBrowseApiResponse(movieList);
        context.updateBrowseResponseExpireTime(new Date().getTime()+(60*1000));
      })
      .catch((error) => {
       
      })
      .finally(() => {
      });
  }

 async function searchButton(event) {

          event.preventDefault();

            // shut all the other filters
             document.getElementsByClassName("genre-filter")[0].value = "-1";
             document.getElementsByClassName("year-filter")[0].value = "-1";
             document.getElementsByClassName("rating-filter")[0].value = "0";
             //
             context.browseSetFilterGenreOff(1); // genre
             context.browseSetFilterYearOff(2);  // year
             context.browseSetFilterRatingOff(3); //rating

             context.browseSetFilterMovieNameOn(4,event.target[0].value); 


             paging[0]= 1 ;
             paging[1]= 2 ;
             paging[2]= 3 ;
             context.changeBrowseCurrentPage(paging[0]);

      context.browseSetFilterOn();

     
       let movieInput = document.getElementsByClassName("filter-search-input")[0].value;
        if (movieInput !== ""){

              movieInput = movieInput.split(" ").join("+");
                
              let url = "https://api.themoviedb.org/3/search/movie?api_key="+DATA.API_KEY+
                  "&query="+movieInput+"&page="+context.currentPageBrowse;

                  context.dispatchBrowseLoadTrue();

               await axios
                    .get(url)
                    .then((response) => {

                      if(movieList.results){
                        movieList = [];
                      }

                      movieList = response.data;
                        if (movieList.results.length !== 0){
                        for (let i = 0; i < movieList.results.length; i++) {
                            if(movieList.results[i].release_date !== undefined){
                            movieList.results[i].release_date = movieList.results[i].release_date.slice(0, 4);
                                      }
                              }
                            muteExtraPages();
                        }else{
                          alert("No such movie is found.");
                        }
                        context.dispatchBrowseLoadFalse();
                        
                        movieList.url = response.config.url;
                        context.setBrowseResponseUrl(movieList.url);
                        context.setBrowseApiResponse(movieList);
                        context.updateBrowseResponseExpireTime(new Date().getTime()+(60*1000));

                      })
            .catch((error) => {
             // this.moviesLoadingError = true;
              alert(error);
            })
            .finally(() => {
            //  this.moviesLoading = false;
            });
        }
  }

  function changeFirst(event) {


    context.changeBrowseCurrentPage(parseInt(event.target.innerHTML));

    if (!event.target.classList.contains("active")) {
      event.target.parentElement.classList.add("active");
      document
        .getElementsByClassName("middle-page")[0]
        .classList.remove("active");
      document
        .getElementsByClassName("last-page")[0]
        .classList.remove("active");
    }
  }
  function changeMiddle(event) {
    context.changeBrowseCurrentPage(parseInt(event.target.innerHTML));
    if (!event.target.classList.contains("active")) {
      event.target.parentElement.classList.add("active");
      document
        .getElementsByClassName("first-page")[0]
        .classList.remove("active");
      document
        .getElementsByClassName("last-page")[0]
        .classList.remove("active");
    }
  }
  function changeLast(event) {
    context.changeBrowseCurrentPage(parseInt(event.target.innerHTML));

    if (!event.target.classList.contains("active")) {
      event.target.parentElement.classList.add("active");
      document
        .getElementsByClassName("first-page")[0]
        .classList.remove("active");
      document
        .getElementsByClassName("middle-page")[0]
        .classList.remove("active");
    }
  }


  function nextPageClick() {
    if (paging[2] + 1 <= movieList.total_pages) {

      paging[0] = paging[paging.length - 1] + 1;
      paging[1] = paging[0] + 1;
      paging[2] = paging[1] + 1;

      document.getElementsByClassName("first-page")[0].classList.add("active");
      document
        .getElementsByClassName("middle-page")[0]
        .classList.remove("active");
      document
        .getElementsByClassName("last-page")[0]
        .classList.remove("active");

      muteExtraPages();
      context.changeBrowseCurrentPage(paging[0]);
    }
  }

  function prevPageClick() {
    
    if(document.getElementsByClassName("next-page-item")[1].classList.contains("muted")){
      document.getElementsByClassName("next-page-item")[1].classList.remove("muted")
    }

    if(document.getElementsByClassName("middle-page")[0].classList.contains("muted")){
      document.getElementsByClassName("middle-page")[0].classList.remove("muted")
    }

    if(document.getElementsByClassName("last-page")[0].classList.contains("muted")){
      document.getElementsByClassName("last-page")[0].classList.remove("muted")
    }



    if (paging[0] > 1) {
      paging[2] = paging[0] - 1;
      paging[1] = paging[2] - 1;
      paging[0] = paging[1] - 1;

      document.getElementsByClassName("last-page")[0].classList.add("active");
      document
        .getElementsByClassName("first-page")[0]
        .classList.remove("active");
      document
        .getElementsByClassName("middle-page")[0]
        .classList.remove("active");
      context.changeBrowseCurrentPage(paging[2]);
    }
  }



};

export default Browse;
