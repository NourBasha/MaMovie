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