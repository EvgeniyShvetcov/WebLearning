import { UsersActions } from '../actions/UsersActions';

const initialState = {
	users: [],
	isFetching: false,
	error: '',
};

export default function UsersReducer(state = initialState, action) {
	switch (action.type) {
		case UsersActions.GET_CONNECTED_USERS_REQUEST:
			return { ...state, isFetching: true };
		case UsersActions.GET_CONNECTED_USERS_SUCCESS:
			return { ...state, users: action.payload, isFetching: false };
		case UsersActions.GET_CONNECTED_USERS_FAIL:
			return { ...state, error: action.payload };
		case UsersActions.USER_CONNECTED:
			return { ...state, users: action.payload };
		case UsersActions.USER_DISCONNECTED:
			return {
				...state,
				users: state.users.filter(user => user.id !== action.payload.id),
			};
		default:
			return state;
	}
}
