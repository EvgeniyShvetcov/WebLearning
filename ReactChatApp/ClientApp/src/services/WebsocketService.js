import * as SignalR from '@aspnet/signalr';
let singleton = Symbol();
let singletonEnforcer = Symbol();

class WebsocketService {
	constructor(enforcer) {
		if (enforcer !== singletonEnforcer)
			throw new Error(
				'Instantiation failed: use Singleton.getInstance() instead of new.'
			);
	}

	static get instance() {
		if (!this[singleton])
			this[singleton] = new WebsocketService(singletonEnforcer);
		return this[singleton];
	}

	static set instance(v) {
		throw new Error("Can't change constant property!");
	}

	get isConnected() {
		return (
			this._connection !== null &&
			this._connection.connectionState === SignalR.HubConnectionState.Connected
		);
	}

	init(connectionString, access_token) {
		this._connection = new SignalR.HubConnectionBuilder()
			.withUrl(connectionString, {
				transport:
					SignalR.HttpTransportType.WebSockets |
					SignalR.HttpTransportType.LongPolling,
				accessTokenFactory: () => {
					return access_token;
				},
			})
			.configureLogging(SignalR.LogLevel.Information)
			.build();

		return this._connection.start();
	}

	sendMessage(message) {
		this._connection
			.invoke('SendMessage', message)
			.catch(err => console.error(err, 'red'));
	}

	registerMessageReceiveAction(messageReceivedCallback) {
		this._connection.on('ReceiveMessage', message => {
			messageReceivedCallback(message);
		});
	}

	registerUserLoginAction(userLoginCallback) {
		this._connection.on('UserLoggedIn', user => {
			userLoginCallback(user);
		});
	}

	registerUserLogoutAction(userLogoutCallback) {
		this._connection.on('UserLoggedOut', user => {
			userLogoutCallback(user);
		});
	}
}

export default WebsocketService;
