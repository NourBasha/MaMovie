import { combineReducers } from "redux";
import { HomeLoadingReducer } from "./home_loading_reducer";



 const rootReducer = combineReducers({
        homeLoading : HomeLoadingReducer 
})

export default rootReducer;