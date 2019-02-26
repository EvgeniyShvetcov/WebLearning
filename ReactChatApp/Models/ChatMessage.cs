using System;
using System.ComponentModel.DataAnnotations;

namespace ReactChatApp.Models
{
    public class ChatMessage
    {
        public int Id { get; set; }
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
        [Required]
        [StringLength(30)]
        public string Sender { get; set; }
        public string Message { get; set; }
    }
}