import * as ACTION_TYPES from "../actions/action_types";

export const initialState = {
  genre: false,
  genrePick:'',
  year: false,
  yearPick:'',
  rating: false,
  ratingPick:'',
  movieName: false,
  movieNamePick:''
};

export const FilterTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FILTER_GENRE_ON:
      return {
        ...state,
        genre: true,
        genrePick: action.payload
      };
    case ACTION_TYPES.FILTER_GENRE_OFF:
      return {
        ...state,
        genre: false,
      };
    case ACTION_TYPES.FILTER_YEAR_ON:
      return {
        ...state,
        year: true,
        yearPick: action.payload
      };
    case ACTION_TYPES.FILTER_YEAR_OFF:
      return {
        ...state,
        year: false,
      };
      case ACTION_TYPES.FILTER_RATING_ON:
      return {
        ...state,
        rating: true,
        ratingPick: action.payload
      };
    case ACTION_TYPES.FILTER_RATING_OFF:
      return {
        ...state,
        rating: false,
      };

      case ACTION_TYPES.FILTER_MOVIE_NAME_ON:
      return {
        ...state,
        movieName : true,
        movieNamePick: action.payload
      };
    case ACTION_TYPES.FILTER_MOVIE_NAME_OFF:
      return {
        ...state,
       movieName : false
      };  

    default:
      return state;
  }
};
