export default class ChatService{
    fetchMessagesList(setMessagesList){
        fetch("api/Chat/InitialMessages")
            .then(response => response.json())
            .then(data => setMessagesList(data));
    }
}