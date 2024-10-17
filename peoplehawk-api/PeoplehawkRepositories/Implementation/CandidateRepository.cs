
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories.Implementation;
public class CandidateRepository : GenericRepository<Candidate>, ICandidateRepository
{
    private readonly ApplicationDbContext _context;
    public CandidateRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
}
