using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using ReactChatApp.Models;
using ReactChatApp.Services;

namespace ReactChatApp.Hubs
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class ChatHub : HubWithPresence
    {
        private readonly IChatService _chatService;
        private readonly IUserTracker _userService;
        public ChatHub(IChatService chatService, IUserTracker userService) : base(userService)
        {
            _chatService = chatService;
            _userService = userService;
        }
        public void AddMessage(string message)
        {
            var name = Context.User?.Identity?.Name;
            var chatMessage = _chatService.CreateNewMessage(name, message);
            // Call the MessageAdded method on the clients side.
            Clients.All.SendAsync("MessageAdded", chatMessage);
        }

        public override Task OnConnectedAsync()
        {
            var name = Context.User?.Identity?.Name;
            var sessionId = Context.User?.FindFirstValue("sid");
            var user = _userService.AddUser(sessionId, name);
            Clients.All.SendAsync("UserLoggedOn", user);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var name = Context.User?.Identity?.Name;
            var sessionId = Context.User?.FindFirstValue("sid");
            _userService.RemoveUser(sessionId);
            Clients.Others.SendAsync("UserLoggedOut", new User { Name = name, Id = sessionId });
            return base.OnDisconnectedAsync(exception);
        }
    }
}