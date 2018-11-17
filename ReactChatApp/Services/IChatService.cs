using System.Collections.Generic;
using ReactChatApp.Models;

namespace ReactChatApp.Services
{
    public interface IChatService
    {
        ICollection<ChatMessage> GetAllInitially();
        ChatMessage CreateNewMessage(string senderName, string message);
        bool AddNewMessage(ChatMessage message);
    }
}