using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories.Implementation;

public class CandidateClientRepository : GenericRepository<CandidateClient>
{
    private readonly ApplicationDbContext _context;

    public CandidateClientRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

}
