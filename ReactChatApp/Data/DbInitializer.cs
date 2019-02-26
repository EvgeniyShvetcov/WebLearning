using System;
using System.Linq;
using ReactChatApp.Models;

namespace ReactChatApp.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ChatContext context)
        {
            if (context.Messages.Any())
            {
                return;
            }

            var currentDate = DateTime.Now;
            var messages = new ChatMessage[]
            {
                new ChatMessage{Date = currentDate.AddMinutes(-8).AddSeconds(-8), Message = "Hey", Sender = "Mo" },
                new ChatMessage{Date = currentDate.AddMinutes(-7).AddSeconds(-7), Message = "Hello Mo!", Sender = "Pete" },
                new ChatMessage{Date = currentDate.AddMinutes(-6).AddSeconds(-6), Message = "Hi Mo :-)", Sender = "Joe" },
                new ChatMessage{Date = currentDate.AddMinutes(-5).AddSeconds(-5), Message = "Hey Pete and Joe, how are you?", Sender = "Mo" },
                new ChatMessage{Date = currentDate.AddMinutes(-4).AddSeconds(-4), Message = "fine, thanks", Sender = "Joe" },
                new ChatMessage{Date = currentDate.AddMinutes(-3).AddSeconds(-3), Message = "well... could be better :-/", Sender = "Pete" },
                new ChatMessage{Date = currentDate.AddMinutes(-2).AddSeconds(-2), Message = "what's up, pete?", Sender = "Mary" },
                new ChatMessage{Date = currentDate.AddMinutes(-1).AddSeconds(-1), Message = "nothing special. that's the reason... ;-)", Sender = "Pete" }
            };
            context.Messages.AddRange(messages);
            context.SaveChanges();
        }
    }
}