import { createStore, combineReducers } from 'redux';
import { AppReducer } from '../reducers/AppReduces';

const rootReducer = combineReducers({
	app: AppReducer,
});

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
