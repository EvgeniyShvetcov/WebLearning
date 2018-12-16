import { combineReducers } from 'redux';
import { userReducer } from './user';
import { pageReducer } from './page';

//Merge several reducer into root
export const rootReducer = combineReducers({
	user: userReducer,
	page: pageReducer,
});
