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
		return this._connection != null;
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

		this._connection.start().catch(err => console.error(err, 'red'));
	}

	sendMessage(message) {
		this._connection.invoke('AddMessage', message);
	}

	registerMessageAdded(messageAddedCallback) {
		this._connection.on('MessageAdded', message => {
			messageAddedCallback(message);
		});
	}

	registerUserLoginOn(userLoginOnCallback) {
		this._connection.on('UserLoggedOn', user => {
			console.log('UserloggedIn');
			userLoginOnCallback(user);
		});
	}

	registerUserLoginOut(userLoginOutCallback) {
		this._connection.on('UserLoggedOut', user => {
			userLoginOutCallback(user);
		});
	}
}

export default WebsocketService;
