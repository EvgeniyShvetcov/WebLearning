import { ChatActions } from '../actions/ChatActions';
import { UsersActions } from '../actions/UsersActions';
import MessageType from '../helpers/MessageType';

const initialState = {
	messages: [],
};

export default function ChatReducer(state = initialState, action) {
	switch (action.type) {
		case ChatActions.MESSAGE_RECEIVED: {
			return { ...state, messages: [...state.messages, action.payload] };
		}
		case UsersActions.USER_CONNECTED:
		case UsersActions.USER_DISCONNECTED: {
			return {
				...state,
				messages: [
					...state.messages,
					{ ...action.payload, messageType: MessageType.UsersInteraction },
				],
			};
		}
		default: {
			return state;
		}
	}
}
