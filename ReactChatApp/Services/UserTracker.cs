using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using ReactChatApp.Models;

namespace ReactChatApp.Services
{
    public class UserTracker : IUserTracker
    {
        private readonly ICollection<User> _joinedUsersList;

        public event Action<User> UserJoined;
        public event Action<User> UserLeft;

        public UserTracker()
        {
            _joinedUsersList = new List<User>();
        }

        public User AddUser(string sid, string userName)
        {
            if (!_joinedUsersList.Any(item => item.Id == sid))
            {
                var user = new User
                {
                    Id = sid,
                    Name = userName
                };
                _joinedUsersList.Add(user);
                UserJoined?.Invoke(user);
                return user;
            }
            else
            {
                return null;
            }
        }
        public void RemoveUser(string sid)
        {
            var findedUser = _joinedUsersList.SingleOrDefault(item => item.Id == sid);
            if (findedUser != null)
            {
                _joinedUsersList.Remove(findedUser);
                UserLeft?.Invoke(findedUser);
            }
        }

        public Task<IEnumerable<User>> GetOnlineUsers()
        {
            return Task.FromResult(_joinedUsersList.AsEnumerable());
        }


    }
}