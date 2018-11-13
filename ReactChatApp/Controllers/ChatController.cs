using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactChatApp.Models;

namespace ReactChat.Controllers
{
    [Route("api/[controller]")]
    public class ChatController : Controller
    {
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
            var date = DateTime.Now;
            return new[] {
                new ChatMessage{ Id = 1, Date = date.AddMinutes(-8).AddSeconds(-8), Message = "Hey", Sender = "Mo" },
                new ChatMessage{ Id = 2, Date = date.AddMinutes(-7).AddSeconds(-7), Message = "Hallo Mo!", Sender = "Peter" },
                new ChatMessage{ Id = 3, Date = date.AddMinutes(-6).AddSeconds(-6), Message = "Salli Mo :-)", Sender = "Juergen" },
                new ChatMessage{ Id = 4, Date = date.AddMinutes(-5).AddSeconds(-5), Message = "Hey Peter und Juergen, wie läufts", Sender = "Mo" },
                new ChatMessage{ Id = 5, Date = date.AddMinutes(-4).AddSeconds(-4), Message = "gut, danke", Sender = "Juergen" },
                new ChatMessage{ Id = 6, Date = date.AddMinutes(-3).AddSeconds(-3), Message = "naja... könnte besser sein :-/", Sender = "Peter" },
                new ChatMessage{ Id = 7, Date = date.AddMinutes(-2).AddSeconds(-2), Message = "was ist den los, peter?", Sender = "Marion" },
                new ChatMessage{ Id = 8, Date = date.AddMinutes(-1).AddSeconds(-1), Message = "nichts. das is es ja eben... ;-)", Sender = "Peter" }
            };
        }
    }
}
