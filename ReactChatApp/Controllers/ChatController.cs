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
        public ChatController(IChatService chatService)
        {
            _chatService = chatService;
        }
        [HttpGet("[action]")]
        public IEnumerable<User> LoggedOnUsers()
        {
            return new[]{
            new User { Id = 1, Name = "Joe" },
            new User { Id = 3, Name = "Mary" },
            new User { Id = 2, Name = "Pete" },
            new User { Id = 4, Name = "Mo" } };
        }

        [HttpGet("[action]")]
        public IEnumerable<ChatMessage> InitialMessages()
        {
            return _chatService.GetAllInitially();
        }
    }
}
