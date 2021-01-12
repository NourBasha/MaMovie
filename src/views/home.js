import React, { useEffect, useContext, useRef, useCallback } from "react";
import axios from "axios";
import * as DATA from "../utils/data";
import Context from "../utils/context";

import MovieCard from '../components/functional/movieCard';





let moviesList = [];



const Home = (props) => {
  const context = useContext(Context);
  const contextRef = useRef(useContext(Context));


  const getMovies = useCallback(()=>{
     axios
    .get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=" +
        DATA.API_KEY +
        "&language=en-US&page=1"
    )
    .then((response) => {
        if (response.data) {
        moviesList = response.data.results;
        contextRef.current.dispatchRedLoadingFalse();

        moviesList.url = response.config.url;
        contextRef.current.setHomeResponseUrl(moviesList.url);
        contextRef.current.setHomeApiResponse(moviesList);
        contextRef.current.updateHomeResponseExpireTime(new Date().getTime()+(60*1000));
        }
    })
    .catch((error) => {
    })
    .finally(() => {
        
    });
  }, [])

  useEffect(() => {
    

    if(contextRef.current.homeResponseExpireTime > new Date().getTime() 
    && contextRef.current.homeResponseUrl === moviesList.url){
          moviesList = contextRef.current.homeApiResponse;
    }else{

      getMovies();
     
    }

  }, [getMovies]);
 

  return (
    <div className=" home-container" >
     
      {/* start of movies */}
      <div className=" home-movies container-fluid ">
          <div className="head-movies row d-flex justify-content-center pl-4 pr-4">

            {context.redHomeLoading === false ? (
              <MovieCard movieList={moviesList} />
            ) : 
            (
              <div className="text-center">
                <div className="spinner-border text-info m-5 "
                      style={{width:'4rem', height:'4rem'}} role="status">
                    </div>
              </div>
            )}
          </div>
      </div>
      {/* end of movies */}

      {/* start of sign up */}
      <div className="sign-up">
        <div className="heading">
          <h2 className="d-flex justify-content-center">Subscribe!</h2>
          <p className="d-flex justify-content-center">
            Get the latest updates on movies
          </p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 ml-auto   text-center text-md-right ">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    @
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="E-mail"
                  aria-label="E-mail"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="col-12 col-md-4  text-center text-md-left">
              <button className="btn btn-light">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      {/* end of sign up */}

      {/* start of footer */}

      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-8 col-md-8 col-lg-6 text-left footer-brand ">
              <a
                id="brand-logo"
                className="navbar-brand mr-3 ma"
                href="/">
                Ma<span className="mamovies">Movies</span>{" "}
              </a>
              <p>
                This website gets its data from themoviedb, we only use it here
                to showcase our software development abilities and to practice
                software development. We hope you enjoy your visit to our
                website and hopefully you will come back again!
              </p>
            </div>

            <div className="col-12 col-sm-4 col-md-4 col-lg-3 text-left  helpful-links ">
              <h6>Helpful Links</h6>
              <div className="row ">
                <div className="col">
                  <ul className="footer-links1">
                    <li>
                      <a href="/">About</a>
                    </li>
                    <li>
                      <a href="/">Team</a>
                    </li>
                    <li>
                      <a href="/">Privacy Policy</a>
                    </li>
                  </ul>
                </div>
                <div className="col">
                  <ul className="footer-links2">
                    <li>
                      <a href="/">FAQ</a>
                    </li>
                    <li>
                      <a href="/">Blog</a>
                    </li>
                    <li>
                      <a href="/">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3 text-left footer-address">
              <h6>Contact Us</h6>
              <ul>
                <li>2342 Sheraton St. next to hollywood avn, CA,USA</li>
                <li>Phone: +201020696796</li>
                <li>
                  Email: <a href="/">Nour.basha2011@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* end of footer */}
    </div>
  );
};



export default  Home;
