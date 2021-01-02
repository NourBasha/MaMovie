import * as ACTION_TYPES from '../actions/action_types';


export const initialState = {
    filter_on : false
} 

export const FilterOnReducer = (state = initialState , action) => {
            
        switch (action.type) {
            case ACTION_TYPES.FILTER_ON:
                return {
                    ...state,
                    filter_on : true  
                }
             case ACTION_TYPES.FILTER_OFF:
                    return {
                        ...state,
                        filter_on : false  
                    }
        
            default:
                return state
        }
}