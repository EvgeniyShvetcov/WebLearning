import { ChatActions } from '../actions/ChatActions';
import { UsersActions } from '../actions/UsersActions';
import MessageType from '../helpers/MessageType';

const initialState = {
	messages: [],
	countOfAllMessages: 0,
	messagesOffset: 0,
	isFetching: false,
	afterGettingHistory: false,
	error: '',
};

export default function ChatReducer(state = initialState, action) {
	switch (action.type) {
		case ChatActions.MESSAGE_RECEIVED: {
			return {
				...state,
				afterGettingHistory: false,
				messages: [...state.messages, action.payload],
			};
		}
		case ChatActions.GET_MESSAGE_HISTORY_REQUEST: {
			return { ...state, isFetching: true, error: '' };
		}
		case ChatActions.GET_MESSAGE_HISTORY_SUCCESS: {
			return {
				...state,
				isFetching: false,
				afterGettingHistory: true,
				messages: [...action.payload.messages, ...state.messages],
				countOfAllMessages: action.payload.countOfAllMessages,
				messagesOffset: state.messagesOffset + action.payload.messages.length,
			};
		}
		case ChatActions.GET_MESSAGE_HISTORY_FAIL: {
			return {
				...state,
				afterGettingHistory: true,
				error: action.payload.message,
			};
		}
		case UsersActions.USER_CONNECTED: {
			return {
				...state,
				afterGettingHistory: false,
				messages: [
					...state.messages,
					{
						id: action.payload.id,
						message: ` - ${action.payload.name} has joined the chanel - `,
						messageType: MessageType.UsersInteraction,
					},
				],
			};
		}
		case UsersActions.USER_DISCONNECTED: {
			return {
				...state,
				afterGettingHistory: false,
				messages: [
					...state.messages,
					{
						id: action.payload.id,
						message: ` - ${action.payload.name} has left the chanel - `,
						messageType: MessageType.UsersInteraction,
					},
				],
			};
		}
		default: {
			return state;
		}
	}
}
