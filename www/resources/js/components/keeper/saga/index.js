import { all } from "redux-saga/effects";
import stockSaga from "./stockSaga";
import dailySaga from "./dailySaga";
import loanSaga from "./loanSaga";

function* rootSaga () {
    yield all([
        stockSaga(),
        dailySaga(),
        loanSaga()
    ]);
}

export default rootSaga;
