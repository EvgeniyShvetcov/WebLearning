using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using ReactChatApp.Models;
using ReactChatApp.Services;

namespace ReactChatApp.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IChatService _chatService;
        public ChatHub(IChatService chatService)
        {
            _chatService = chatService;
        }
        public void AddMessage(string message)
        {
            var chatMessage = _chatService.CreateNewMessage("Jurgen", message);
            // Call the MessageAdded method on the clients side.
            Clients.All.SendAsync("MessageAdded", chatMessage);
        }
    }
}