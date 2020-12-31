import { combineReducers } from "redux";
import { HomeLoadingReducer } from "./home_loading_reducer";
import {BrowseLoadingReducer  } from "./browse_loading_reducer";



 const rootReducer = combineReducers({
        homeLoading : HomeLoadingReducer,
        browseLoading: BrowseLoadingReducer
})

export default rootReducer;