import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import AppReducer from '../reducers/AppReducer';
import UsersReducer from '../reducers/UsersReducer';
import ChatReducer from '../reducers/ChatReducer';

const rootReducer = combineReducers({
	app: AppReducer,
	users: UsersReducer,
	chat: ChatReducer,
});

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(reduxThunk),
		window.__REDUX_DEVTOOLS_EXTENSION__
			? window.__REDUX_DEVTOOLS_EXTENSION__()
			: f => f
	)
);

export default store;
