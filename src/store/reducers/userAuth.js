import * as ACTION_TYPES from '../actions/action_types';



const initialState = {
    userAuthenticated: window.localStorage.getItem('authState'),
}


const UserAuthReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.USER_AUTHENTICATED: 
            return {
                ...state,
                userAuthenticated : true
            }
            case ACTION_TYPES.USER_NOT_AUTHENTICATED: 
            return {
                ...state,
                userAuthenticated : false
            }
    
        default:
           return state;
    }

}

export default UserAuthReducer; 