using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using ReactChatApp.Models;

namespace ReactChatApp.Services
{
    public interface IUserTracker
    {
        Task<IEnumerable<User>> GetOnlineUsers();
        User AddUser(string sid, string userName);
        void RemoveUser(string sid);

        event Action<User> UserJoined;
        event Action<User> UserLeft;
    }
}