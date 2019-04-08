import { AppActions } from '../actions/AppActions';
import WebsocketService from '../services/WebsocketService';
import {
	UserConnectedAction,
	UserDisconnectedAction,
} from '../actions/UsersActions';
import { MessageReceivedAction, ChatActions } from '../actions/ChatActions';

const websocketServiceMiddleware = store => {
	let websocketServiceInstance;
	return next => async action => {
		switch (action.type) {
			//After authorization create socket connection with service
			case AppActions.LOGIN_USER: {
				const user = action.payload;
				if (user === null) break;
				const id_token = user.id_token;
				if (id_token === null) break;
				websocketServiceInstance = WebsocketService.instance;
				await websocketServiceInstance.init(
					'http://localhost:5000/chat',
					id_token
				);

				//Register chat events
				websocketServiceInstance.registerUserLoginAction(user => {
					store.dispatch(UserConnectedAction(user));
				});

				websocketServiceInstance.registerUserLogoutAction(user => {
					store.dispatch(UserDisconnectedAction(user));
				});

				websocketServiceInstance.registerMessageReceiveAction(message => {
					store.dispatch(MessageReceivedAction(message));
				});

				break;
			}
			case ChatActions.SEND_MESSAGE: {
				websocketServiceInstance.sendMessage(action.payload);
				break;
			}
			default: {
				break;
			}
		}
		return next(action);
	};
};

export default websocketServiceMiddleware;
