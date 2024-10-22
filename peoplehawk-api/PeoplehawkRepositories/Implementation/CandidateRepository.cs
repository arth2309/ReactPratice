
using Microsoft.EntityFrameworkCore;
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

   public async Task<User> getUser (int userId)
    {
        User userDetails = await
    (from candidate in  _context.Candidates
     where candidate.UserId == userId
     join candidateClient in _context.CandidatesClients
         on candidate.Id equals candidateClient.CandidateId
     join client in _context.Clients
         on candidateClient.ClientId equals client.Id
     join user in _context.Users
         on client.UserId equals user.Id
     select user)
    .FirstOrDefaultAsync();

        return userDetails;

    }
}
