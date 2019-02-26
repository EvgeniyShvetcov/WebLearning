using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using ReactChatApp.Services;
using ReactChatApp.Models;

namespace ReactChatApp.Hubs
{
    public abstract class HubWithPresence : Hub
    {
        protected readonly IUserTracker _userTracker;

        public HubWithPresence(IUserTracker userTracker)
        {
            _userTracker = userTracker;
            _userTracker.UserJoined += OnUserJoined;
            _userTracker.UserLeft += OnUserLeft;
        }

        public virtual async void OnUserLeft(User user){}

        public virtual async void OnUserJoined(User user){}
    }
}