import {useState} from 'react';
import Routes from './router/routes';
import Context from "./utils/context";


const App = () => {


     const [loadingMovies, setLoadingMovies] = useState(true);

     const homeLoadingTrue = () =>{
        setLoadingMovies(true);
    }
    const homeLoadingFalse = () =>{
      setLoadingMovies(false);
  }


    return (
      <div>
         <Context.Provider 
                value={{
                  homeLoadingMovies: loadingMovies,
                  setLoadingMoviesTrue: () => homeLoadingTrue(),
                  setLoadingMoviesFalse: () => homeLoadingFalse()
                }}>
                  
               <Routes />
          </Context.Provider>
      </div>
    )
}

export default App;