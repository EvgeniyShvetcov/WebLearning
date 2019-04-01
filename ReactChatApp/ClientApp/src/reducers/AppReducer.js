import { AppActions } from '../actions/AppActions';

const initialState = {
	user: undefined,
	isAuthenticated: false,
	error: '',
};

export default function AppReducer(state = initialState, action) {
	switch (action.type) {
		case AppActions.LOGIN_USER:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
			};
		case AppActions.LOGIN_USER_FAIL:
			return {
				...state,
				user: undefined,
				error: action.payload.message,
			};
		case AppActions.LOGOUT:
			return { ...state, isAuthenticated: false, user: undefined };
		default:
			return state;
	}
}
