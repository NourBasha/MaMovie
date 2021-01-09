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



export const saveBrowseResponseUrl= (res)  => {
    return{
        type : ACTION_TYPES.BROWSE_RESPONSE_URL,
        payload : res
    }
}

export const saveBrowseResponse= (res)  => {
    return{
        type : ACTION_TYPES.BROWSE_RESPONSE_DATA,
        payload : res
    }
}

export const saveBrowseResponseExpireTime= (res)  => {
    return{
        type : ACTION_TYPES.BROWSE_RESPONSE_EXPIRE_TIME,
        payload : res
    }
}


export const saveHomeResponseUrl= (res)  => {
    return{
        type : ACTION_TYPES.HOME_RESPONSE_URL,
        payload : res
    }
}

export const saveHomeResponse= (res)  => {
    return{
        type : ACTION_TYPES.HOME_RESPONSE_DATA,
        payload : res
    }
}

export const saveHomeResponseExpireTime= (res)  => {
    return{
        type : ACTION_TYPES.HOME_RESPONSE_EXPIRE_TIME,
        payload : res
    }
}



export const setUserAuthenticated= ()  => {
    return{
        type : ACTION_TYPES.USER_AUTHENTICATED,
      
    }
}


export const setUserNotAuthenticated= ()  => {
    return{
        type : ACTION_TYPES.USER_NOT_AUTHENTICATED,
    }
}




// export const testThunkOnline = ()  => {

//     return dispatch => {
//         dispatch(addTodoStarted());

//         axios
//           .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=83a0145e56d35a45ba5ea0f752806cd2`)
//           .then(res => {
//               console.log('insdie thunk, res is ');
//               console.log(res);
//               let x = [];
//               x= res.data.results

//                 dispatch(addTodoSuccess(x));
           
           
//           })
//           .catch(err => {
//             // dispatch(addTodoFailure(err.message));
//           }); 
//     }

// }

// const addTodoStarted = () =>{
//     return {
//         type: ACTION_TYPES.THUNK1
//     }
// }

// const addTodoSuccess = (todos) =>{
//     return {
//         type: ACTION_TYPES.THUNK2,
//         payload: {...todos}
        
//     }
// }