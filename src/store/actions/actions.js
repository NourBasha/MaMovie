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

export const  filterOn = () => {

    return {
       type : ACTION_TYPES.FILTER_ON
    }
}

export const  filterOff = () => {

    return {
       type : ACTION_TYPES.FILTER_OFF
    }
}



export const  genreFilterOn = (data) => {

    return {
       type : ACTION_TYPES.FILTER_GENRE_ON,
       payload: data
    }
}

export const  genreFilterOff = (def) => {

    return {
       type : ACTION_TYPES.FILTER_GENRE_OFF,
       payload :def
    }
}



export const  yearFilterOn = (data) => {

    return {
       type : ACTION_TYPES.FILTER_YEAR_ON,
       payload: data
    }
}

export const  yearFilterOff = (def) => {

    return {
       type : ACTION_TYPES.FILTER_YEAR_OFF,
       payload: def
    }
}


export const  ratingFilterOn = (data) => {

    return {
       type : ACTION_TYPES.FILTER_RATING_ON,
       payload: data
    }
}

export const  ratingFilterOff = (def) => {

    return {
       type : ACTION_TYPES.FILTER_RATING_OFF,
       payload:def
    }
}


export const  movieNameFilterOn = (data) => {

    return {
       type : ACTION_TYPES.FILTER_MOVIE_NAME_ON,
       payload: data
    }
}

export const  movieNameFilterOff = () => {

    return {
       type : ACTION_TYPES.FILTER_MOVIE_NAME_OFF
    }
}