import { useReducer, useState } from "react";
import Routes from "./router/routes";
import Context from "./utils/context";
import * as Reducer from "./store/reducers/home_loading_reducer";
import * as BrowseReducer from "./store/reducers/browse_loading_reducer";
import * as FilterReducer from "./store/reducers/filter_on";
import * as FilterTypeReducer from "./store/reducers/filter_type";

import * as ACTIONS from "./store/actions/actions";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faStar);

const App = () => {
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

  const redHomeLoadingTrue = () => {
    dispatchLoading(ACTIONS.home_loading());
  };
  const redHomeLoadingFalse = () => {
    dispatchLoading(ACTIONS.home_not_loading());
  };

  const browseLoadingTrue = () => {
    dispatchBrowseLoading(ACTIONS.browse_loading());
  };
  const browseLoadingFalse = () => {
    console.log("inside dispatching action");
    dispatchBrowseLoading(ACTIONS.browse_not_loading());
  };

  const changeCurrentPage = (page) => {
    console.log("inside changing current page");
    console.log("page to be changed to is : " + page);
    setCurrentPage(page);
  };

  const setFilterOn = () => {
    dispatchFilterOn(ACTIONS.filterOn);
  };

  const setFilterOff = () => {
    dispatchFilterOn(ACTIONS.filterOff);
  };

  const addFilterTypeOn = (type, data) => {
    console.log( `inside filter on  type is :${type} and data is :${data}`)
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
      case 1: // genre on
          dispatchFilterType(ACTIONS.genreFilterOff());
        break;
      case 2: // year on
      dispatchFilterType(ACTIONS.yearFilterOff());
        break;
      case 3: // rating
        dispatchFilterType(ACTIONS.ratingFilterOff());
        break;
      case 4: // movie name
        dispatchFilterType(ACTIONS.movieNameFilterOff());
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Context.Provider
        value={{
          redHomeLoading: redLoadingMovies.loading,
          dispatchRedLoadingTrue: () => redHomeLoadingTrue(),
          dispatchRedLoadingFalse: () => redHomeLoadingFalse(),
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
        }}
      >
        <Routes />
      </Context.Provider>
    </div>
  );
};

export default App;
