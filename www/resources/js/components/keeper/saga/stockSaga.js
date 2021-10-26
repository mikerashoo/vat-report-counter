import {put, call, all, takeLatest} from 'redux-saga/effects';   
import { showStocksAction, showStocksError, clearTransactionsAction, showCustomersAction } from "../actions/stockActions";
import { fetchCustomersApi, fetchStocksApi, saveNewSellApi } from '../apis/stockApi';
import { STOCK_ACTIONS } from '../constants/stockActions';

function* fetchStocksSaga(){
    try {  
        const stockData = yield call(fetchStocksApi); 
        yield put (showStocksAction(stockData));
    }
    catch (error) {
        yield put (showStocksError('Problem with fetching employees please try again!'))
    }
}   

function* addNewSellSaga(action){
    try {  
        const stockData = yield call(saveNewSellApi, action.sell); 
        yield put (clearTransactionsAction(stockData));
    }
    catch (error) {
    }
}  


function* fetchCustomersSaga(){
    try {  
        const sellsData = yield call(fetchCustomersApi); 
        yield put (showCustomersAction(sellsData));
    }
    catch (error) {
        yield put (showStocksError('Problem with fetching employees please try again!'));
    }
}   

function* stockSaga(){
    yield all([
      yield takeLatest(STOCK_ACTIONS.FETCH_STOCK_ACTION, fetchStocksSaga),        
      yield takeLatest(STOCK_ACTIONS.ADD_NEW_SELL_ACTION, addNewSellSaga),    
      yield takeLatest(STOCK_ACTIONS.FETCH_CUSTOMERS_ACTION, fetchCustomersSaga), 
    ]) 
  } 
  export default stockSaga;