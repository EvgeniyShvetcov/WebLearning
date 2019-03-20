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

	async fetchMessagesList(messagesCount, messagesOffset) {
		let requestUrl = new URL('http://localhost:5000/api/Chat/InitialMessages');
		let params = new URLSearchParams({ messagesCount, messagesOffset });
		requestUrl.search = params;
		return fetch(requestUrl).then(response => {
			if (response.ok) return response.json();
		});
	}
}
