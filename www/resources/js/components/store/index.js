import { createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import itemReducers from '../reducers/itemReducers'

import rootSaga from '../saga';
const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
    items: itemReducers
})

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga);
export default store;
