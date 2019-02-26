export default class ChatService {
	constructor(websocketService, onMessageRecieve) {
		if (websocketService !== null && websocketService.isConnected) {
			this._websocketService = websocketService;
			this._websocketService.registerMessageAdded(onMessageRecieve);
		}
	}

	sendMessage(message) {
		if (this._websocketService) this._websocketService.sendMessage(message);
	}

	fetchMessagesList(setMessagesList) {
		fetch('http://localhost:5000/api/Chat/InitialMessages')
			.then(response => {
				if (response.ok) return response.json();
			})
			.then(data => setMessagesList(data));
	}
}
