import { useReducer} from 'react';
import Routes from './router/routes';
import Context from "./utils/context";
import * as Reducer from './store/reducers/home_loading_reducer';
import * as BrowseReducer from "./store/reducers/browse_loading_reducer";
import * as ACTIONS from './store/actions/actions';


import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'


library.add(fab ,faStar);



const App = () => {


  const [redLoadingMovies, dispatchLoading] = useReducer(Reducer.HomeLoadingReducer, Reducer.initialState);
  const [browseLoadingMovies, dispatchBrowseLoading] = useReducer(BrowseReducer.BrowseLoadingReducer,
                                                                   BrowseReducer.initialState);

  const redHomeLoadingTrue = () => {
    dispatchLoading(ACTIONS.home_loading());
  }
  const redHomeLoadingFalse = () => {
    dispatchLoading(ACTIONS.home_not_loading());
  }

  
  const browseLoadingTrue = () => {
    dispatchBrowseLoading(ACTIONS.browse_loading());
  }
  const browseLoadingFalse = () => {
    console.log("inside dispatching action");
    dispatchBrowseLoading(ACTIONS.browse_not_loading());
  }

    return (
      <div>
         <Context.Provider 
                value={{
                  redHomeLoading : redLoadingMovies.loading,
                  dispatchRedLoadingTrue : () => redHomeLoadingTrue(),
                  dispatchRedLoadingFalse : () => redHomeLoadingFalse(),
                  browseMoviesLoading : browseLoadingMovies.loading,
                  dispatchBrowseLoadTrue : () => browseLoadingTrue(),
                  dispatchBrowseLoadFalse : () => browseLoadingFalse()
                }}>
                  
               <Routes />
          </Context.Provider>
      </div>
    )
}

export default App;