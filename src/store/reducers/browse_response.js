import * as ACTION_TYPES from '../actions/action_types';

export const initialState = {
        url: '',
        browseResponse : [],
        expireTime : 0
}


export const BrowseResponseReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ACTION_TYPES.BROWSE_RESPONSE_DATA:
                return{
                    ...state,
                    browseResponse : action.payload
                }
        case ACTION_TYPES.BROWSE_RESPONSE_EXPIRE_TIME:
                    return{
                        ...state,
                        expireTime : action.payload
                    }
        case ACTION_TYPES.BROWSE_RESPONSE_URL:
                        return{
                            ...state,
                            url : action.payload
                        }
            
        default:
             return state
    }
}