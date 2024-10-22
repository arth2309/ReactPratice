using Microsoft.EntityFrameworkCore;
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories.Implementation;

public class CandidateClientRepository : GenericRepository<CandidateClient>,ICandidateClientRepository
{
    private readonly ApplicationDbContext _context;

    public CandidateClientRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
    public async Task<IEnumerable<int>> GetUserIdsByClientIdAsync(int clientId)
    {
        return await (from cc in _context.CandidatesClients
                      join c in _context.Candidates on cc.CandidateId equals c.Id
                      where cc.ClientId == clientId
                      select c.UserId)
                     .ToListAsync();
    }
}
