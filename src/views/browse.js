
import axios from 'axios';
import {useEffect, useContext, useRef,useState} from 'react';
import Context from '../utils/context';
import * as DATA from "../utils/data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import './browse.scss';


let movieList = [];
let paging = [1,2,3];
const Browse = () => {

    const context = useContext(Context);
    const refContext = useRef(useContext(Context));
    const[currentPage,setCurrentPage] =  useState(1);
    
  useEffect(() => {
    console.log("inside useEffect");
    async function getmovies() {
        await axios
        .get("https://api.themoviedb.org/3/movie/top_rated?api_key="+DATA.API_KEY+"&language=en-US&page="+currentPage )
        .then((response) => {
            if (response.data) {
            movieList = response.data.results;
            console.log(movieList);
            console.log(refContext.current.browseMoviesLoading);
            if(refContext.current.browseMoviesLoading !== false){
              refContext.current.dispatchBrowseLoadFalse();
            }
            console.log(refContext.current.browseMoviesLoading);
            }
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            
        });
    }
    getmovies();
}, [currentPage]);

    
function Genres() {
    return(
        <select className="custom-select genre-filter" onChange={searchByGenre} >
        <option value="-" disabled defaultValue>Genres</option>
        <option value="0" >All</option>
        <option value="28">Action</option>
        <option value="12">Adventure</option>
        <option value="16">Animation</option>
        <option value="35">Comedy</option>
        <option value="80">Crime</option>
        <option value="99">Documentary</option>
        <option value="18">Drama</option>
        <option value="10751">Family</option>
        <option value="14">Fantasy</option>
        <option value="36">History</option>
        <option value="27">Horror</option>
        <option value="10402">Music</option>
        <option value="9648">Mystery</option>
        <option value="10749">Romance</option>
        <option value="878">Science Fiction</option>
        <option value="10770">Tv Movie</option>
        <option value="53">Thriller</option>
        <option value="10752">War</option>
        <option value="37">Western</option>
      </select>
    )
}

function SearchYear() {
    let years =[];
    let currentYear= new Date().getFullYear();
    for(let i= currentYear ; i >= 1900 ; i--){
        years.push(i);
    }
    return(
        <select className="custom-select year-filter" onChange={searchByYear}>
              <option value="-" defaultValue disabled>Year</option>
              {
                  years.map((year,index)=>(
                    <option key={year} value={year} >
                                   {year} 
                     </option>
                  ))

              }
             
            </select>
    )
}

function Rating() {
    let arr = [];

    

    for (let index = 1; index <= 10; index++) {
        if(index === 1 ){
            arr.push(  <option key={index-1} value="-" defaultValue disabled>Rating</option>);
        }
        if(index === 10){
            arr.push( <option key={index} value={index}>{index}</option> )

        }else{
            arr.push( <option key={index} value={index}>{index}&#43;</option> )
        }
      
    }

    return(
        <select className="custom-select rating-filter" onChange={searchByRating}>
        {arr }    
      </select>
    )
}


function MovieCard(props) {
    const list = props.movies.map((movie, index) => (
      <span key={movie.id} className="col-6 col-md-4 col-lg-3 movie-col"
            style={{margin:0, padding:0}} >
          <div className="rating">
                <span className="top-span">
                  <FontAwesomeIcon  icon="star"   className="next" color="yellow" />
                  { movie.vote_average }</span>
                  <span style={{'fontSize':15+'px'}}>&frasl;10</span>
              </div>

              <div className="title">
                <span> { movie.title } </span>
              </div>

              <div className="release_date">
                <span> { movie.release_date.slice(0,4) } </span>
              </div>
                <Link to={{pathname:'/movie/'+movie.id }}>
                <img
                className="poster-image"
                src={DATA.IMAGE_PATH + movie.poster_path}
                alt=""/>
                </Link>
               
      </span>
    ));

    return list;
  }

 
    return(
        <div className="browse   bg-dark">
             <div className="container-fluid">

         {/* start of filter*/}
            <div className="filter text-center">
                <h3>Filter Movies</h3>

                {/*first row*/}
            <div className="row">
                <div className="col-6 col-md-4  col-lg-3" >
                        <Genres />
                </div>
                <div className="col-6 col-md-4 col-lg-2">
                            <SearchYear />
                </div>
                <div className="col-12 col-md-4 col-lg-3">
                            <Rating />
                </div>
                <div className="col-10 offset-1  col-md-6 offset-md-3 offset-lg-0 col-md-4 col-lg-4">
                    <form  onSubmit={searchButton}   className="form-inline my-2 my-lg-0 myform mt-3 mt-lg-0">
                    <input
                        className="form-control  mr-sm-2 filter-search-input"
                        type="search"
                        placeholder="Movie Name"
                        aria-label="Search"
                    />
                    <button onClick={searchButton}
                        className="btn btn-outline-info  my-2 my-sm-0"
                        type="button"> Search
                    </button>
                    </form>
                </div>
                </div>
            </div>
       {/* end of filter*/}

       {/* start of movies fetch*/}
     
         {/*second row*/}
       <div className="row movie-row" >
       {
           context.browseMoviesLoading !== true
           ? (
                   <MovieCard movies={movieList}/>
           )
           : (<p >Loading ...</p>)
       }
       </div>

       

  
       {/* start of movies fetch*/}


    </div>



            <nav aria-label=" Page navigation example">
            <ul className="pagination justify-content-center paging ">
                <li className="page-item">
                <a className="page-link prev-page" href="" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                </a>
                </li>
                <li className="page-item paging-item first active ">
                <a onClick={changeFirst} className="page-link first-a" href="/browse">{
                    paging[0]
                }</a>
                </li>
                <li className="page-item paging-item middle">
                <a onClick={changeMiddle} className="page-link middle-a" href="/browse">{
                    paging[1]
                }</a>
                </li>
                <li className="page-item paging-item last">
                <a onClick={changeLast} className="page-link last-a" href="/browse">{
                    paging[2]
                }</a>
                </li>
                <li className="page-item">
                <a className="page-link next-page" href="" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                </a>
                </li>
            </ul>
            </nav> 
        

            <div className="copyright mt-4 ">
           <div className=" text-left copy-right ">
                <div className="container">
                  
          <p className="mb-0 mr-auto p-2">  COPYRIGHT &copy; MaMovie | All Rights Reserved.</p>
         
                </div>
        </div>
       </div>

        </div>
    )

   function searchByGenre(event) {

        // // shut the movie search
        //   document.getElementsByClassName("filter-search-input")[0].value = "";
        //   this.filterByMovieName = false;
        //   this.filterApplied = true;
        //   this.filterType[0] = true ;
        //    let url = "https://api.themoviedb.org/3/discover/movie?api_key="+this.apiKey
        //    +"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false"
        //    +"&page="+this.currentPage; 
  
        // if(this.filterType[1] === true){ // year filter 
        //   let selectYear = document.getElementsByClassName("year-filter")[0].value;
        //   url = url + "&primary_release_date.gte="
        //   +selectYear+"-01-01&primary_release_date.lte="+selectYear+"-12-31"
        //   } 
        //    if (this.filterType[2]===true){
        //        let selectRating = document.getElementsByClassName("rating-filter")[0].value;
        //         url = url +"&vote_average.gte="+selectRating;
        //     }
  
        //  axios
        //   .get( event.target.value === 0 ? url : url+"&with_genres="+event.target.value)
        //   .then((response) => {
        //     this.popMovies = response.data;
        //     for (let i = 0; i < this.popMovies.results.length; i++) {
        //       this.popMovies.results[i].release_date = this.popMovies.results[i].release_date.slice(0, 4);
        //     }
        //     this.muteExtraPages();
        //   })
        //   .catch((error) => {
        //    // this.moviesLoadingError = true;
        //     console.log(error);
        //   })
        //   .finally(() => {
        //   //  this.moviesLoading = false;
        //   });
  
      }
      function searchByYear(event){
  
  
    //     // shut the movie search
    //       document.getElementsByClassName("filter-search-input")[0].value = "";
    //       this.filterByMovieName = false;
    //       this.filterApplied = true;
    //       this.filterType[1] = true ; // year filter
  
              
    //     let url = "https://api.themoviedb.org/3/discover/movie?api_key="+this.apiKey
    //        +"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false"
    //        +"&page="+this.currentPage; 
  
    //         if (this.filterType[0] === true){ // genres filter
    //                let selectGenre = document.getElementsByClassName("genre-filter")[0].value;
    //           if (selectGenre != 0){
    //               url = url +"&with_genres="+selectGenre;
    //           }
    //         }
            
    //         if (this.filterType[2]===true){
    //            let selectRating = document.getElementsByClassName("rating-filter")[0].value;
    //             url = url +"&vote_average.gte="+selectRating;
    //         }
  
    //    axios
    //       .get(url +"&primary_release_date.gte="
    //       +event.target.value+"-01-01&primary_release_date.lte="+event.target.value+"-12-31")
    //       .then((response) => {
    //         this.popMovies = response.data;
    //         for (let i = 0; i < this.popMovies.results.length; i++) {
    //           this.popMovies.results[i].release_date = this.popMovies.results[i].release_date.slice(0, 4);
    //         }
    //                   this.muteExtraPages();
  
    //       })
    //       .catch((error) => {
    //         this.moviesLoadingError = true;
    //         console.log(error);
    //       })
    //       .finally(() => {
    //         this.moviesLoading = false;
    //       });
      }

      function searchByRating(event){
  
    //       // shut the movie search
    //       document.getElementsByClassName("filter-search-input")[0].value = "";
    //       this.filterByMovieName = false;
    //       this.filterApplied = true; // my filters
    //       this.filterType[2] = true ; // rating filter
  
    //     let url = "https://api.themoviedb.org/3/discover/movie?api_key="+this.apiKey
    //        +"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false"
    //        +"&page="+this.currentPage; 
  
    //         if (this.filterType[0] === true){ // genres filter
    //                let selectGenre = document.getElementsByClassName("genre-filter")[0].value;
    //           if (selectGenre != 0){
    //               url = url +"&with_genres="+selectGenre;
    //           }
    //         }
            
    //        if(this.filterType[1] === true){ // year filter 
    //               let selectYear = document.getElementsByClassName("year-filter")[0].value;
    //               url = url + "&primary_release_date.gte="
    //               +selectYear+"-01-01&primary_release_date.lte="+selectYear+"-12-31"
    //            }
  
    //    axios
    //       .get(url +"&vote_average.gte="+event.target.value)
    //       .then((response) => {
    //         this.popMovies = response.data;
            
    //           for (let i = 0; i < this.popMovies.results.length; i++) {
    //             if(this.popMovies.results[i].release_date != undefined){
    //                this.popMovies.results[i].release_date = this.popMovies.results[i].release_date.slice(0, 4);
    //             }
    //         }
    //                  this.muteExtraPages();
    //       })
    //       .catch((error) => {
    //         this.moviesLoadingError = true;
    //         console.log(error);
    //       })
    //       .finally(() => {
    //         this.moviesLoading = false;
    //       });
      }

      function searchButton (){
          
//         console.log("insdie button click");
//         // shut all the other filters 
//          document.getElementsByClassName("genre-filter")[0].value = "-";
//          document.getElementsByClassName("year-filter")[0].value = "-";
//          document.getElementsByClassName("rating-filter")[0].value = "-";
//          //
//          this.firstLoad = false;
//          this.paging[0]= 1 ; 
//          this.paging[1]= 2 ;
//          this.paging[2]= 3 ; 

//    this.filterApplied = false;
       
//    this.filterByMovieName = true; // use this for paging 

//   let movieInput = document.getElementsByClassName("filter-search-input")[0].value;

//     if (movieInput != ""){
//       movieInput = movieInput.split(" ").join("+");
//           let url = "https://api.themoviedb.org/3/search/movie?api_key="+this.apiKey+
//           "&query="+ movieInput+"&page=1";
//         axios
//             .get(url )
//             .then((response) => {
//               this.popMovies = response.data;
//                 if (this.popMovies.results.length != 0){
//                 for (let i = 0; i < this.popMovies.results.length; i++) {
//                 if(this.popMovies.results[i].release_date != undefined){
//                 this.popMovies.results[i].release_date = this.popMovies.results[i].release_date.slice(0, 4);
//                            }
//                   }  
//                   this.muteExtraPages();
//                 }else{
//                   alert("No such movie is found.");
//                 }
//     })
//     .catch((error) => {
//       this.moviesLoadingError = true;
//       alert(error);
//     })
//     .finally(() => {
//       this.moviesLoading = false;
//     });
//     }

      }

      function changeFirst(event) {
        setCurrentPage(event.target.innerHTML);
      }
     function changeMiddle(event) {
        setCurrentPage(event.target.innerHTML);
      }
     function changeLast(event) {
        setCurrentPage(event.target.innerHTML);
      }
    
      function muteExtraPages(){
        if (movieList.total_pages <= currentPage+2){
              switch(movieList.total_pages){
                case currentPage :  {  
                              document.getElementsByClassName("middle")[0].classList.add("muted");
                              document.getElementsByClassName("last")[0].classList.add("muted"); 
                              break; } 
                case currentPage +1 :  {  
                              document.getElementsByClassName("last")[0].classList.add("muted");
                              break ;}
                case currentPage+2 :  {   document.getElementsByClassName("next-page")[0].classList.add("muted");  
                     break ;}
              }
        }else {
                document.getElementsByClassName("middle")[0].classList.remove("muted");
                document.getElementsByClassName("last")[0].classList.remove("muted");
                document.getElementsByClassName("next-page")[0].classList.remove("muted"); 
        }
    }
    
     function nextPageClick() {
    
        if (paging[2]+1 <= movieList.total_pages) {
           
            paging[0] = paging[paging.length - 1] + 1;
           
            muteExtraPages();
    
            document.getElementsByClassName("first")[0].classList.add("active");
           document.getElementsByClassName("middle")[0].classList.remove("active");
          document.getElementsByClassName("last")[0].classList.remove("active");
    
          paging[1] = paging[0] + 1;
          paging[2] = paging[1] + 1;
          setCurrentPage(paging[0]) ;
        }
      }
      function prevPageClick() {
    
        if (paging[0] > 1) {
          paging[2] = paging[0] - 1;
          paging[1] = paging[2] - 1;
          paging[0] = paging[1] - 1;
          
          document.getElementsByClassName("last")[0].classList.add("active");
          document.getElementsByClassName("first")[0].classList.remove("active");
          document.getElementsByClassName("middle")[0].classList.remove("active");
          setCurrentPage(paging[2]); 
           }
      }

}

export default Browse;