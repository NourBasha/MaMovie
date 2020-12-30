import * as ACTION_TYPES from '../actions/action_types';

export const initialState = {
    loading : true
} 


export const HomeLoadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.HOME_LOADING:
            return{
                ...state,
                loading : true
            }
            case ACTION_TYPES.HOME_NOT_LOADING:
            return{
                ...state,
                loading : false
            }
    
        default:
           return state
    }
}