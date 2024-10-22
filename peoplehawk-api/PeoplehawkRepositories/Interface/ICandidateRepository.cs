using PeoplehawkRepositories.Models;
using System.Threading.Tasks;

namespace PeoplehawkRepositories.Interface;
public interface ICandidateRepository : IGenericRepository<Candidate>
{
    Task<User> getUser(int userId);
}
