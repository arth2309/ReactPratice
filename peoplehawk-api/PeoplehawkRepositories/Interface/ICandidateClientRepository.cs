using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories.Interface;
public interface ICandidateClientRepository : IGenericRepository<CandidateClient>
{
    Task<IEnumerable<int>> GetUserIdsByClientIdAsync(int clientId);
    Task<IEnumerable<int>> GetIsAllowedUserIdsByClientIdAsync(int clientId);
    Task<int> getClientId(int CandidateId);
}
