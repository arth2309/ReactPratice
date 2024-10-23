using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories.Interface;
public interface IUserRepository : IGenericRepository<User>
{
    Task<string> GeOwnedByAsync(int userId);
}
