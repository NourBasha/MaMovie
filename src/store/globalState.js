import { useEffect, useReducer, useState } from "react";
import * as Reducer from "./reducers/home_loading_reducer";
import * as BrowseReducer from "./reducers/browse_loading_reducer";
import * as FilterReducer from "./reducers/filter_on";
import * as FilterTypeReducer from "./reducers/filter_type";
import * as BrowseResponseRed from "./reducers/browse_response";
import * as HomeResponse from "./reducers/home_response";
import * as ACTIONS from "./actions/actions";
import Context from '../utils/context';

const GlobalState = (props)=>{
    const [theme, setTheme] = useState('light');

  const [componentMounted, setComponentMounted] = useState(false);

  
  const setMode = (mode) =>{
    window.localStorage.setItem('theme',mode);
    setTheme(mode);
}


const themeToggeler = () => {
      theme ==='light' ? setMode('dark') : setMode('light');
       
}
  useEffect(()=>{
    let localTheme = window.localStorage.getItem('theme');
    localTheme ? setTheme(localTheme) : setMode('light')
    setComponentMounted(true);
  },[]);

  
  const [redLoadingMovies, dispatchLoading] = useReducer(
    Reducer.HomeLoadingReducer,
    Reducer.initialState
  );
  const [browseLoadingMovies, dispatchBrowseLoading] = useReducer(
    BrowseReducer.BrowseLoadingReducer,
    BrowseReducer.initialState
  );
  const [browseCurrnetPage, setCurrentPage] = useState(1);
  const [browseFilterOn, dispatchFilterOn] = useReducer(
    FilterReducer.FilterOnReducer,
    FilterReducer.initialState
  );

  const [filterType, dispatchFilterType] = useReducer(
    FilterTypeReducer.FilterTypesReducer,
    FilterTypeReducer.initialState
  );

  const [genresLoading, setGenresLoading] = useState(false);

  const [browseResponse,dispatchBrowseResponse]= useReducer(BrowseResponseRed.BrowseResponseReducer,
    BrowseResponseRed.initialState);

    const[homeResponse,dispatchHomeResponse] = useReducer(HomeResponse.HomeResponseReducer,
                                               HomeResponse.initialState)


  const redHomeLoadingTrue = () => {
    dispatchLoading(ACTIONS.home_loading());
  };
  const redHomeLoadingFalse = () => {
    dispatchLoading(ACTIONS.home_not_loading());
  };

  const updateBrowseGenresLoading = (val) =>{
    setGenresLoading(val)
  }

  const browseLoadingTrue = () => {
    dispatchBrowseLoading(ACTIONS.browse_loading());
  };
  const browseLoadingFalse = () => {
    dispatchBrowseLoading(ACTIONS.browse_not_loading());
  };

  const changeCurrentPage = (page) => {
  
    setCurrentPage(page);
  };

  const setFilterOn = () => {
    dispatchFilterOn(ACTIONS.filterOn());
  };

  const setFilterOff = () => {
    dispatchFilterOn(ACTIONS.filterOff());
  };

  const addFilterTypeOn = (type, data) => {
    switch (type) {
      case 1: // genre on
      dispatchFilterType(ACTIONS.genreFilterOn(data));
        break;
      case 2: // year on
      dispatchFilterType(ACTIONS.yearFilterOn(data));
        break;
      case 3: // rating
        dispatchFilterType(ACTIONS.ratingFilterOn(data));
        break;
      case 4: // movie name
        dispatchFilterType(ACTIONS.movieNameFilterOn(data));
        break;
      default:
        break;
    }
  };
  const addFilterTypeOff = (type) => {
    switch (type) {
      case 1: // genre off
          dispatchFilterType(ACTIONS.genreFilterOff(-1)); // parameter is the default value, to update 'select' element back to default
        break;
      case 2: // year off
      dispatchFilterType(ACTIONS.yearFilterOff(-1));
        break;
      case 3: // rating off
        dispatchFilterType(ACTIONS.ratingFilterOff(0));
        break;
      case 4: // movie name off
        dispatchFilterType(ACTIONS.movieNameFilterOff());
        break;
      default:
        break;
    }
  };

  const updateBrowseResponseUrl = (res) =>{
    dispatchBrowseResponse(ACTIONS.saveBrowseResponseUrl(res));
}

  const updateBrowseResponse = (res) =>{
      dispatchBrowseResponse(ACTIONS.saveBrowseResponse(res));
  }
  
  const updateBrowseResponseExpireTime = (res) =>{
    dispatchBrowseResponse(ACTIONS.saveBrowseResponseExpireTime(res));
}


const updateHomeResponseUrl = (res) =>{
  dispatchHomeResponse(ACTIONS.saveHomeResponseUrl(res));
}

const updateHomeResponse = (res) =>{
  dispatchHomeResponse(ACTIONS.saveHomeResponse(res));
}

const updateHomeResponseExpireTime = (res) =>{
  dispatchHomeResponse(ACTIONS.saveHomeResponseExpireTime(res));
}

if (!componentMounted) return ( 
    <div className="text-center">
    <div className="spinner-border text-info m-5 "
          style={{width:'4rem', height:'4rem'}} role="status">
        </div>
  </div>
            )

    return (
        <Context.Provider value={{
            redHomeLoading: redLoadingMovies.loading,
            dispatchRedLoadingTrue: () => redHomeLoadingTrue(),
            dispatchRedLoadingFalse: () => redHomeLoadingFalse(),
            browseGenresLoading: genresLoading,
            browseSetGenresLoading: (val) => updateBrowseGenresLoading(val),
            browseMoviesLoading: browseLoadingMovies.loading,
            dispatchBrowseLoadTrue: () => browseLoadingTrue(),
            dispatchBrowseLoadFalse: () => browseLoadingFalse(),
            currentPageBrowse: browseCurrnetPage,
            changeBrowseCurrentPage: (page) => changeCurrentPage(page),
            browseFilterOnState: browseFilterOn.filter_on,
            browseSetFilterOn: () => setFilterOn(),
            broeseSetFilterOff: () => setFilterOff(),
            browseFilterType: filterType,
            browseSetFilterGenreOn: (type,data) => addFilterTypeOn(type,data),
            browseSetFilterGenreOff: (type) => addFilterTypeOff(type),
            browseSetFilterYearOn: (type,data) => addFilterTypeOn(type,data),
            browseSetFilterYearOff: (type) => addFilterTypeOff(type),
            browseSetFilterRatingOn: (type,data) => addFilterTypeOn(type,data),
            browseSetFilterRatingOff: (type) => addFilterTypeOff(type),
            browseSetFilterMovieNameOn: (type,data) => addFilterTypeOn(type,data),
            browseSetFilterMovieNameOff: (type) => addFilterTypeOff(type),
            browseResponseUrl: browseResponse.url,
            browseApiResponse : browseResponse.browseResponse,
            browseResponseExpireTime:browseResponse.expireTime,
            setBrowseResponseUrl : (url) => updateBrowseResponseUrl(url),
            setBrowseApiResponse: (res) => updateBrowseResponse(res),
            updateBrowseResponseExpireTime: (res) => updateBrowseResponseExpireTime(res),
            homeResponseUrl: homeResponse.url,
            homeApiResponse : homeResponse.homeResponse,
            homeResponseExpireTime:homeResponse.expireTime,
            setHomeResponseUrl : (url) => updateHomeResponseUrl(url),
            setHomeApiResponse: (res) => updateHomeResponse(res),
            updateHomeResponseExpireTime: (res) => updateHomeResponseExpireTime(res),
            appTheme: theme,
            toggleAppTheme: () => themeToggeler()
        }}>
                {props.children}
        </Context.Provider>
    )

}

export default GlobalState;