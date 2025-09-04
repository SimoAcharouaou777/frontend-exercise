import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { listReducer, detailsReducer } from './reducers';
import { rootSaga } from './sagas';

const rootReducer = combineReducers({
  list: listReducer,
  details: detailsReducer
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootSaga);

export default store;
