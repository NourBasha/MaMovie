import * as ACTION_TYPES from '../actions/action_types';

export const initialState = {
    loading : true
} 


export const BrowseLoadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.BROWSE_IS_LOADING:
            return{
                ...state,
                loading : true
            }
            case ACTION_TYPES.BROWSE_NOT_LOADING:
            return{
                ...state,
                loading : false
            }
    
        default:
           return state
    }
}