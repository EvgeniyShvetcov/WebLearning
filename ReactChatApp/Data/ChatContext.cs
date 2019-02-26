using Microsoft.EntityFrameworkCore;
using ReactChatApp.Models;

namespace ReactChatApp.Data
{
    public class ChatContext : DbContext
    {
        public DbSet<ChatMessage> Messages { get; set; }
        public ChatContext(DbContextOptions<ChatContext> options) : base(options) { }
    }
}