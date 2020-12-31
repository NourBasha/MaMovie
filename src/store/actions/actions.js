import * as ACTION_TYPES from './action_types';



export const home_loading = () => {

    return{
        type : ACTION_TYPES.HOME_LOADING
    }
}


export const home_not_loading = () => {

     return {
        type : ACTION_TYPES.HOME_NOT_LOADING
     }
}


export const browse_loading = () => {

    return{
        type : ACTION_TYPES.BROWSE_IS_LOADING
    }
}


export const  browse_not_loading = () => {

     return {
        type : ACTION_TYPES.BROWSE_NOT_LOADING
     }
}