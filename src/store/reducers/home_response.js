import * as ACTION_TYPES from '../actions/action_types';

export const initialState = {
        url: '',
        homeResponse : [],
        expireTime : 0
}


export const HomeResponseReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ACTION_TYPES.HOME_RESPONSE_DATA:
                return{
                    ...state,
                    homeResponse : action.payload
                }
        case ACTION_TYPES.HOME_RESPONSE_EXPIRE_TIME:
                    return{
                        ...state,
                        expireTime : action.payload
                    }
        case ACTION_TYPES.HOME_RESPONSE_URL:
                        return{
                            ...state,
                            url : action.payload
                        }
            
        default:
             return state
    }
}