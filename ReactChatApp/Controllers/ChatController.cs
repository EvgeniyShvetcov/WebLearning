using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactChatApp.Models;
using ReactChatApp.Services;

namespace ReactChat.Controllers
{
    [Route("api/[controller]")]
    public class ChatController : Controller
    {
        private readonly IChatService _chatService;
        private readonly IUserTracker _userService;
        public ChatController(IChatService chatService, IUserTracker userService)
        {
            _chatService = chatService;
            _userService = userService;
        }
        [HttpGet("[action]")]
        public async Task<IEnumerable<User>> LoggedOnUsers()
        {
            return await _userService.GetOnlineUsers();
        }

        [HttpGet("[action]")]
        public async Task<MessagesPack> InitialMessages(int messagesCount, int messagesOffset)
        {
            return await _chatService.GetMessagesList(messagesCount, messagesOffset);
        }
    }
}
