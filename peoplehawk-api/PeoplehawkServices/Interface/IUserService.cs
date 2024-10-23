using Microsoft.AspNetCore.Http;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using System.Linq.Expressions;

namespace PeoplehawkServices.Interface;
public interface IUserService : IGenericService<User>
{
    Task<string> Login(LoginDetails loginDetails);
    Task<UserDTO> Register(UserDTO userDTO);


    Task<List<UserDTO>> UsersList(Expression<Func<User, bool>> predicate);

    Task<UserDTO> UpdateFile(IFormFile file, int UserId);

    Task<(byte[], string)> GetPhoto(int UserId);

    Task<UserDetailDTO> GetDetail(int UserId);

    Task<List<User>> GetUserByCriteria(Expression<Func<User, bool>>? filter = null,
        Func<IQueryable<User>?, IOrderedQueryable<User>>? orderBy = null,
        int? page = null,
        int? pageSize = null,
        params Expression<Func<User, object>>[]? includes);
    Task<AboutMeDetailDTO> AddAboutMe(AboutMeDetailDTO aboutMeDetailDTO);
   

}


