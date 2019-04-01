import { createStore, combineReducers } from 'redux';
import AppReducer from '../reducers/AppReducer';
import UsersReducer from '../reducers/UsersReducer';

const rootReducer = combineReducers({
	app: AppReducer,
	users: UsersReducer,
});

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__
		? window.__REDUX_DEVTOOLS_EXTENSION__()
		: f => f
);

export default store;
