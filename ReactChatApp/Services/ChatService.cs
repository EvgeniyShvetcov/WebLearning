using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
        public Task<MessagesPack> GetMessagesList(int messagesCount, int messagesOffset)
        {
            var countOfAllMessages = _context.Messages.Count();
            var skippedMessages = countOfAllMessages - (messagesOffset + messagesCount);
            if (skippedMessages < 0)
            {
                messagesCount = skippedMessages + messagesCount;
                skippedMessages = 0;
            }
            //Next: calculate count of initial messages for
            //different screen sizes.
            var messages = _context.Messages
                .AsNoTracking()
                .Skip(skippedMessages)
                .Take(messagesCount)
                .AsEnumerable();


            return Task.FromResult(new MessagesPack { CountOfAllMessages = countOfAllMessages, Messages = messages });
        }
    }
}