import { createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {stockReducers, dailyReducers, loanReducers } from '../reducers';
import rootSaga from '../saga';
const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
  stocks: stockReducers,
  dailySell: dailyReducers,
  loanData: loanReducers
});


const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga);
export default store;

