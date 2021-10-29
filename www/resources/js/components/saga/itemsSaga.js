import {put, call, all, takeLatest} from 'redux-saga/effects';
import {ItemActionConstants} from '../constants/itemActionConstants'
import { addItemAction, fetchItemsFromLastReportAction, saveItemErrorAction, saveTransactionAction, saveTransactionErrorAction, saveTransactionSuccessAction, setStartingDateAction, showItemsAction, showItemsFetchingErrorAction } from '../actions/itemActions';
import { fetchItemsFromLastReportApi, getStartingDateApi, saveItemApi, saveTransactionApi } from '../apis/itemsApi';
function* fetchItemsFromLastReportSaga (action) {
    try {
        const items = yield call(fetchItemsFromLastReportApi);
        yield put(showItemsAction(items));
    }
    catch(error){
        yield put(showItemsFetchingErrorAction(error));
    }
}

function* saveItemSaga (action) {
    try {
        const new_item = yield call(saveItemApi, action.item);
        yield put(addItemAction(new_item));
    } catch (error) {
        yield put(saveItemErrorAction("Error saving new item"));
    }
}

function* getStartingDateFromLastReportSaga() {
    try {
        const starting_date = yield call(getStartingDateApi);
        yield put(setStartingDateAction(starting_date));
    } catch (error) {
        yield put(saveItemErrorAction("Error saving new item"));
    }
}

function* saveTransactionSaga(action){
    try {
        const save_data = yield call(saveTransactionApi, action.transaction);
        yield all([
            put(saveTransactionSuccessAction()),
            put(fetchItemsFromLastReportAction())
        ])
    } catch (error) {
        yield put(saveTransactionErrorAction("Error saving new transaction"));
    }
}

function* itemsSaga(){
    yield all([
        yield takeLatest(ItemActionConstants.FETCH_ITEMS_FROM_LAST_REPORT_ACTION, fetchItemsFromLastReportSaga),
        yield takeLatest(ItemActionConstants.SAVE_ITEMS_ACTION, saveItemSaga),
        yield takeLatest(ItemActionConstants.FETCH_STARTING_DATE_FROM_LAST_REPORT, getStartingDateFromLastReportSaga),
        yield takeLatest(ItemActionConstants.SAVE_ITEM_TRANSACTIONS_ACTION, saveTransactionSaga)
    ])
}

export default itemsSaga;
