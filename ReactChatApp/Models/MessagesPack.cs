using System.Collections.Generic;

namespace ReactChatApp.Models
{
    public class MessagesPack
    {
        public int CountOfAllMessages { get; set; }
        public IEnumerable<ChatMessage> Messages { get; set; }
    }
}