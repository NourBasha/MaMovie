import {all, fork } from 'redux-saga/effects';
import {watchSignUp} from './signup';



function* rootSaga() {
    yield all(
        [
            fork(watchSignUp)
        ]
    )
}

export default rootSaga;