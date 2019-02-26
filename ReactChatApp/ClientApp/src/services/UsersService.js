export default class UsersServices {
	constructor(websocketService, onUserLoggedOn, onUserLoggedOut) {
		if (websocketService !== null && websocketService.isConnected) {
			this._websocketService = websocketService;
			this._websocketService.registerUserLoginOn(onUserLoggedOn);
			this._websocketService.registerUserLoginOut(onUserLoggedOut);
		}
	}

	fetchOnlineUsersList(setUsersList) {
		fetch('http://localhost:5000/api/Chat/LoggedOnUsers')
			.then(response => {
				if (response.ok) return response.json();
			})
			.then(data => setUsersList(data));
	}
}
