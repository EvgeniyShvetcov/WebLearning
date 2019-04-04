export const UsersActions = {
	GET_CONNECTED_USERS_REQUEST: 'GET_CONNECTED_USERS_REQUEST',
	GET_CONNECTED_USERS_SUCCESS: 'GET_CONNECTED_USERS_SUCCESS',
	GET_CONNECTED_USERS_FAIL: 'GET_CONNECTED_USERS_FAIL',
	USER_CONNECTED: 'USER_CONNECTED',
	USER_DISCONNECTED: 'USER_DISCONNECTED',
};

export function GetConnectedUsers(apiPath, queryParams) {
	return dispatch => {
		dispatch({ type: UsersActions.GET_CONNECTED_USERS_REQUEST });

		if (apiPath == null || apiPath.length === 0) return;
		const queryPath = new URL(apiPath);
		const params = new URLSearchParams({ ...queryParams });
		queryPath.search = params;

		fetch(queryPath)
			.then(response => {
				if (response.ok) return response.json();
				else
					dispatch({
						type: UsersActions.GET_CONNECTED_USERS_FAIL,
						payload: new Error('Failed to obtain a list of users'),
					});
			})
			.then(users => {
				dispatch({
					type: UsersActions.GET_CONNECTED_USERS_SUCCESS,
					payload: users,
				});
			})
			.catch(reason => {
				dispatch({
					type: UsersActions.GET_CONNECTED_USERS_FAIL,
					payload: new Error('Failed to obtain a list of users'),
				});
			});
	};
}
