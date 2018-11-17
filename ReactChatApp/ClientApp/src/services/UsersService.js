import WebsocketService from './WebsocketService';

export default class UsersServices{

    constructor(onUserLoggedOn){
        WebsocketService.registerUserLoginOn(onUserLoggedOn);
    }

    fetchOnlineUsersList(setUsersList){
        fetch("api/Chat/LoggedOnUsers")
            .then(response => response.json())
            .then(data => setUsersList(data));
    }
}