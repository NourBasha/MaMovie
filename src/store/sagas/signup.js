import {
  USER_SIGN_UP_FAILURE,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_SUCCESS_SAGA,
  USER_SIGN_UP_FAILURE_SAGA,
} from "../actions/action_types";
import { put, takeEvery } from "redux-saga/effects";

function* signUpSuccess(action) {
 

  if (action) {


    let prevUsers = window.localStorage.getItem("users");

    if (prevUsers) {

      prevUsers = JSON.parse(prevUsers);
      window.localStorage.setItem("users", JSON.stringify( [action.payload, ...prevUsers] ) );
      window.localStorage.setItem("activeUsername", action.payload.username);
      window.localStorage.setItem("activeEmail", action.payload.email);
    } else {
      window.localStorage.setItem("users", JSON.stringify([action.payload]));
      window.localStorage.setItem("activeUsername", action.payload.username);
      window.localStorage.setItem("activeEmail", action.payload.email);
    }

    window.localStorage.setItem("authState", true);
    yield put({ type: USER_SIGN_UP_SUCCESS, payload: action.payload });

  }


}

function* signUpFailure() {
  yield put({ type: USER_SIGN_UP_FAILURE });
}

export function* watchSignUp() {
  yield takeEvery(USER_SIGN_UP_SUCCESS_SAGA, signUpSuccess);
  yield takeEvery(USER_SIGN_UP_FAILURE_SAGA, signUpFailure);
}
