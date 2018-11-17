import * as SignalR from '@aspnet/signalr';

class WebsocketService{
    constructor(connectionString){
        this._connection =  new SignalR.HubConnectionBuilder()
                            .withUrl(connectionString, {transport: SignalR.HttpTransportType.WebSockets | SignalR.HttpTransportType.LongPolling})
                            .configureLogging(SignalR.LogLevel.Information)
                            .build();

        this._connection.start().catch((err) => console.error(err, 'red'));
    }
 
    sendMessage(message){
        this._connection.invoke("AddMessage", message);
    }

    registerMessageAdded(messageAddedCallback) {
        this._connection.on('MessageAdded', message => {
            messageAddedCallback(message);
        });
    }

    registerUserLoginOn(userLoginOnCallback){
        this._connection.on("UserLoggedOn", (id, name) => {
            userLoginOnCallback(id, name);
        });
    }
}

const WebSocket = new WebsocketService("/chat");
export default WebSocket;