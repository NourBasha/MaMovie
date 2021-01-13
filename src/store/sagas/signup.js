
import { USER_SIGN_UP_FAILURE,
         USER_SIGN_UP_SUCCESS,
      USER_SIGN_UP_SUCCESS_SAGA,
      USER_SIGN_UP_FAILURE_SAGA} from '../actions/action_types';
import {put, takeEvery} from 'redux-saga/effects';


function* signUpSuccess(action) {

            console.log('inside saga before setting data');
            console.log(action.payload);
            console.log(typeof(action.payload));

            if(action){
                window.localStorage.setItem('authState',true);
        yield put({type:USER_SIGN_UP_SUCCESS, payload: action.payload});

        let prevUsers = window.localStorage.getItem('users');
        console.log('parse is :');
        console.log(prevUsers);
        console.log( typeof(prevUsers));
        if(prevUsers){
            action.payload = [action.payload, prevUsers];
            window.localStorage.setItem('users',JSON.stringify(action.payload));
            window.localStorage.setItem('activeUsername',action.payload.username);
            window.localStorage.setItem('activeEmail',action.payload.email);

        }else{
            window.localStorage.setItem('users',JSON.stringify(action.payload));
            window.localStorage.setItem('activeUsername',action.payload.username);
            window.localStorage.setItem('activeEmail',action.payload.email);
        }
        window.localStorage.setItem('authState',true);
    }




}


function* signUpFailure() {
    
    yield put({type:USER_SIGN_UP_FAILURE});
    
    }

export function* watchSignUp(){

    yield takeEvery(USER_SIGN_UP_SUCCESS_SAGA,signUpSuccess);
    yield takeEvery(USER_SIGN_UP_FAILURE_SAGA,signUpFailure);

}