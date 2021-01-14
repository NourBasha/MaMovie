import {USER_SIGN_UP_FAILURE, USER_SIGN_UP_SUCCESS} from '../actions/action_types';

const initialState ={
    users : []
}


const SignupReducer = (state = initialState, action)=>{
    switch (action.type) {
        case USER_SIGN_UP_SUCCESS:
            return{
                ...state,
                users : [action.payload, ...state.users] 
            }
        case USER_SIGN_UP_FAILURE:
            return{
                ...state,
            }
        default:
           return state
    }
}
export default SignupReducer;