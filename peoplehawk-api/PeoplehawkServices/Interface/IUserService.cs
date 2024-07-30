using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkServices.Interface
{
    public interface IUserService : IGenericService<User,UserDTO>
    {
        Task<string> Login(string email, string password);
        Task<UserDTO> Register(UserDTO userDTO);

        string SendEmail(string email);

        Task<List<UserDTO>> UsersList(Expression<Func<User, bool>> predicate);
    }
}
