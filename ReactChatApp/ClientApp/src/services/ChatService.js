import WebsocketService from './WebsocketService';
export default class ChatService {

    constructor(onMessageRecieve){
        WebsocketService.registerMessageAdded(onMessageRecieve);
    }

    sendMessage(message){
        WebsocketService.sendMessage(message);
    }

    fetchMessagesList(setMessagesList) {
        fetch("api/Chat/InitialMessages")
            .then(response => response.json())
            .then(data => setMessagesList(data));
    }
}