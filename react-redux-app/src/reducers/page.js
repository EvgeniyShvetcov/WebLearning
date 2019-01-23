import {
	GET_PHOTOS_REQUEST,
	GET_PHOTOS_SUCCESS,
	GET_PHOTOS_FAIL,
} from '../actions/PageActions';
import { LOGIN_SUCCESS, LOGOUT } from '../actions/UserActions';
import { getCurrentYear } from '../utils/DateHelper';

const initialState = {
	year: getCurrentYear(),
	photos: [],
	isFetching: false,
	error: '',
	isAuthorized: false,
};

export function pageReducer(state = initialState, action) {
	switch (action.type) {
		case GET_PHOTOS_REQUEST:
			return { ...state, year: action.payload, isFetching: true, error: '' };
		case GET_PHOTOS_SUCCESS:
			return { ...state, photos: action.payload, isFetching: false, error: '' };
		case GET_PHOTOS_FAIL:
			return { ...state, isFetching: false, error: action.payload };
		case LOGIN_SUCCESS:
			return { ...state, isAuthorized: true };
		case LOGOUT:
			return { ...state, isAuthorized: false };
		default:
			return state;
	}
}
