import {all} from 'redux-saga/effects'
import itemsSaga from './itemsSaga'
function* rootSaga(){
    yield all([
        itemsSaga()
    ])
}

export default rootSaga;
