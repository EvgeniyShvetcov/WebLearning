export default class UsersServices{
    fetchOnlineUsersList(setUsersList){
        fetch("api/Chat/LoggedOnUsers")
            .then(response => response.json())
            .then(data => setUsersList(data));
    }
}