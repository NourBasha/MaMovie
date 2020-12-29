
import React,{useEffect, useContext} from 'react';
import axios from "axios";
import * as DATA  from '../utils/data';
import Context from '../utils/context';


const Home =(props) => {

    let moviesList= [];
    const context = useContext(Context);

    useEffect(()=>{
        console.log("insdie useffect 2");
        console.log("useEffect :"+context.homeLoadingMovies);
        
         getmovies();
    },[])

    function changeState(){
        console.log("before :"+context.homeLoadingMovies);
        // context.setLoadingMoviesFalse();
        // console.log("after :"+context.homeLoadingMovies);

    }
   async function getmovies (){
   await  axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key="+DATA.API_KEY+"&language=en-US&page=1")
      .then((response) => {

          if(response.data){
              moviesList = response.data.results ;
              console.log(moviesList);
              context.setLoadingMoviesFalse();

          }
      })
      .catch((error) => {
             console.log(error);
      })
      .finally(() => {
        console.log("finally :"+context.homeLoadingMovies);
      })
   }
   
    return(
        <div className="container-fluid">
            <div className="row">
                    {
                        !context.homeLoadingMovies 
                        ? moviesList.map((movie,index) => (
                            <div>
                                <p> inside map </p>
                                  <div class="title">
                                    <span> { movie.title } </span>
                                  </div>
                                 <div class="release_date">
                                     <span> { movie.release_date } </span>
                                 </div>
              
                            </div>
                        ) )
                        : <p> Loading movies </p>

                    }

                    

            </div>

            <h2> {context.homeLoadingMovies}</h2>

                    <br></br>
                    <button onClick={changeState}> change </button>

        </div>
    )
}
    


export default Home;