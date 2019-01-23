import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from '../actions/UserActions';

const initialState = {
	name: '',
	error: '',
	isFetching: false,
};

export function userReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN_REQUEST:
			return { ...state, isFetching: true };
		case LOGIN_SUCCESS:
			return { ...state, isFetching: false, name: action.payload };
		case LOGIN_FAIL:
			return { ...state, isFetching: false, error: action.payload.message };
		case LOGOUT:
			return { ...state, name: '' };
		default:
			return state;
	}
}
