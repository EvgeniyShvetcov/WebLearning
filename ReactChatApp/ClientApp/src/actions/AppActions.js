export const AppActions = {
	LOGIN_USER: 'LOGIN_USER',
	LOGIN_USER_FAIL: 'LOGIN_USER_FAIL',
	LOGOUT: 'LOGOUT',
};

export function UserLogin(user) {
	return {
		type: AppActions.LOGIN_USER,
		payload: user,
	};
}

export function UserLoginFail(error) {
	return {
		type: AppActions.LOGIN_USER_FAIL,
		payload: error,
	};
}

export function UserLogout() {
	return {
		type: AppActions.LOGOUT,
	};
}
