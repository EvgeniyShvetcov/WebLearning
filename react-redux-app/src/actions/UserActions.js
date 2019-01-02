export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export function handleLogin() {
	return dispatch => {
		dispatch({
			type: LOGIN_REQUEST,
		});

		/* global VK */
		VK.Auth.login(response => {
			if (response.session) {
				let user = response.session.user;

				dispatch({
					type: LOGIN_SUCCESS,
					payload: user.first_name,
				});
			} else {
				dispatch({
					type: LOGIN_FAIL,
					error: true,
					payload: new Error('Ошибка авторизации!'),
				});
			}
		}, 4);
	};
}
