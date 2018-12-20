export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export function handleLogin() {
	return dispatch => {
		dispatch({
			type: LOGIN_REQUEST,
		});

		setTimeout(() => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: 'Eugenie',
			});
		}, 1000);
	};
}
