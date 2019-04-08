export const ChatActions = {
	SEND_MESSAGE: 'SEND_MESSAGE',
	MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',
	GET_MESSAGE_HISTORY_REQUEST: 'GET_MESSAGE_HISTORY_REQUEST',
	GET_MESSAGE_HISTORY_SUCCESS: 'GET_MESSAGE_HISTORY_SUCCESS',
	GET_MESSAGE_HISTORY_FAIL: 'GET_MESSAGE_HISTORY_FAIL',
};

export function SendMessage(message) {
	return {
		type: ChatActions.SEND_MESSAGE,
		payload: message,
	};
}

export function MessageReceivedAction(message) {
	return {
		type: ChatActions.MESSAGE_RECEIVED,
		payload: message,
	};
}

export function GetMessageHistory(apiPath, messagesCount, messagesOffset) {
	return dispatch => {
		dispatch({ type: ChatActions.GET_MESSAGE_HISTORY_REQUEST });

		if (apiPath == null || apiPath.length === 0) return;
		const queryPath = new URL(apiPath);
		const params = new URLSearchParams({
			messagesCount,
			messagesOffset,
		});
		queryPath.search = params;

		fetch(queryPath)
			.then(response => {
				if (response.ok) return response.json();
				dispatch({
					type: ChatActions.GET_MESSAGE_HISTORY_FAIL,
					payload: new Error('Failed to obtain message history'),
				});
			})
			.then(messagesPack => {
				dispatch({
					type: ChatActions.GET_MESSAGE_HISTORY_SUCCESS,
					payload: messagesPack,
				});
			})
			.catch(reason => {
				dispatch({
					type: ChatActions.GET_MESSAGE_HISTORY_FAIL,
					payload: new Error('Failed to obtain message history'),
				});
			});
	};
}
