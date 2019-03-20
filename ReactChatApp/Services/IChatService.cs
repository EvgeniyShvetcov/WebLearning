using System.Collections.Generic;
using System.Threading.Tasks;
using ReactChatApp.Models;

namespace ReactChatApp.Services
{
    public interface IChatService
    {
        Task<MessagesPack> GetMessagesList(int messagesCount, int messagesOffset);
        ChatMessage CreateNewMessage(string senderName, string message);
        bool AddNewMessage(ChatMessage message);
    }
}