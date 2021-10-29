import { createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import itemReducers from '../reducers/itemReducers'
import reporReducers from '../reducers/reportReducers';

import rootSaga from '../saga';
const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
    items_state: itemReducers,
    reports_state: reporReducers
})

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga);
export default store;
