using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ReactChatApp.Data;
using ReactChatApp.Models;

namespace ReactChatApp.Services
{
    public class ChatService : IChatService
    {
        private readonly ChatContext _context;
        public ChatService(ChatContext context)
        {
            _context = context;
        }

        public ChatMessage CreateNewMessage(string senderName, string message)
        {
            var newMessage = new ChatMessage { Sender = senderName, Message = message, Date = DateTime.Now };
            _context.Messages.Add(newMessage);
            _context.SaveChanges();
            return newMessage;
        }

        public bool AddNewMessage(ChatMessage message)
        {
            if (_context.Messages.Any(item => item.Id == message.Id))
            {
                return false;
            }
            _context.Add(message);
            _context.SaveChanges();
            return true;
        }
        public Task<IEnumerable<ChatMessage>> GetAllInitially()
        {
            var countOfAllMessages = _context.Messages.Count();
            //Take last 10 messages from DB.
            //Next: calculate count of initial messages for
            //different screen sizes.
            var countOfReceivedMessages = 10;
            var messages = _context.Messages
                .AsNoTracking()
                .Skip(countOfAllMessages - countOfReceivedMessages)
                .AsEnumerable();

            return Task.FromResult(messages);
        }
    }
}