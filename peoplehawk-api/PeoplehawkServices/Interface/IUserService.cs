using Microsoft.AspNetCore.Http;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using System.Linq.Expressions;


namespace PeoplehawkServices.Interface
{
    public interface IUserService : IGenericService<User>
    {
        Task<string> Login(LoginDetails loginDetails);
        Task<UserDTO> Register(UserDTO userDTO);

        string SendEmail(string email);

        Task<List<UserDTO>> UsersList(Expression<Func<User, bool>> predicate);

        Task<UserDTO> UpdateFile(IFormFile file, int UserId);

        Task<(byte[], string)> GetPhoto(int UserId);
    }
}
