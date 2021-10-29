import {all} from 'redux-saga/effects'
import itemsSaga from './itemsSaga'
import reportsSaga from './reportsSaga'
function* rootSaga(){
    yield all([
        itemsSaga(),
        reportsSaga()
    ])
}

export default rootSaga;
