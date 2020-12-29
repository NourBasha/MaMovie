
import React,{useEffect, useContext} from 'react';
import axios from "axios";
import * as DATA  from '../utils/data';
import Context from '../utils/context';

    let moviesList= [];

const Home =(props) => {

    
    const context = useContext(Context);

   

    useEffect(()=>{
        context.dispatchRedLoadingTrue();
         getmovies();
    },[])

  
   async function getmovies (){
       
   await  axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key="+DATA.API_KEY+"&language=en-US&page=1")
      .then((response) => {

          if(response.data){
              moviesList = response.data.results ;
              context.dispatchRedLoadingFalse();
          }
      })
      .catch((error) => {
             console.log(error);
      })
      .finally(() => {
      
      })
   }

    function MovieCard (props){
       
        const movieList = props.movieList.map((movie, index)=>
                            <div key={movie.id} className="card">
                               <div>
                                   {movie.title}
                               </div>
                               <div>
                                     {movie.overview}
                               </div>
                            </div>
                    );
     
      return( 
         <div>
                <h2> card </h2>
              <ul> {movieList} </ul>
         </div>
       )
    }
      
   
    return(
        <div className="container-fluid">


            <div className="row">
                    {
                        context.redHomeLoading  === false 
                        ?  <MovieCard movieList={moviesList}/>
                        : <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                         </div>

                    }
 

            </div>

        </div>
    )
}
    


export default Home;