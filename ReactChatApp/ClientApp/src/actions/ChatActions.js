export const ChatActions = {
	SEND_MESSAGE: 'SEND_MESSAGE',
	MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',
};

export function SendMessage(message) {
	return {
		type: ChatActions.SEND_MESSAGE,
		payload: message,
	};
}
