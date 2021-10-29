import {all, put, call, takeLatest} from 'redux-saga/effects';
import { fetchReportDetailErrorAction, fetchReportDetailSuccessAction, fetchReportsErrorAction, fetchReportsSuccessAction, saveReportErrorAction, saveReportSuccessAction } from '../actions/reportActions';
import { saveReportApi, fetchReportsApi, fetchReportDetail, fetchReportDetailApi } from '../apis/reportsApi';
import { REPORT_ACTION_CONSTANTS } from '../constants/reportConstants';

function* fetchReporsSaga(){
    try {
        const reports = yield call(fetchReportsApi);
        yield put(fetchReportsSuccessAction(reports));
    } catch (error) {
        yield put(fetchReportsErrorAction(error));
    }
}

function* saveReportSaga (action) {
    try {
        const report = yield call(saveReportApi, action.report);
        yield put(saveReportSuccessAction(report));
    } catch (error) {
        yield put(saveReportErrorAction(error));
    }
}

function* fetchReportDetailSaga(action){
    try {
        const report = yield call(fetchReportDetailApi, action.id);
        yield put(fetchReportDetailSuccessAction(report));
    } catch (error) {
        yield put(fetchReportDetailErrorAction(error));
    }
}

function* reportsSaga(){
    yield all([
        yield takeLatest(REPORT_ACTION_CONSTANTS.SAVE_REPORT_ACTION, saveReportSaga),
        yield takeLatest(REPORT_ACTION_CONSTANTS.FETCH_REPORTS_ACTION, fetchReporsSaga),
        yield takeLatest(REPORT_ACTION_CONSTANTS.FETCH_REPORT_DETAIL_ACTION, fetchReportDetailSaga)
    ])
}

export default reportsSaga;
