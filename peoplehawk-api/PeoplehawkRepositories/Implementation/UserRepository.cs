using Microsoft.EntityFrameworkCore;
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories.Implementation;
public class UserRepository : GenericRepository<User>,IUserRepository
{
    private readonly ApplicationDbContext _context;
    public UserRepository(ApplicationDbContext context) : base(context) 
    {
        _context = context;
    }

    public async Task<string> GeOwnedByAsync(int userId)
    {
        var result = await (from u in _context.Users
                            join c in _context.Candidates on u.Id equals c.UserId
                            join cc in _context.CandidatesClients on c.Id equals cc.CandidateId
                            join cl in _context.Clients on cc.ClientId equals cl.Id
                            where u.Id == userId
                            select new { u.FirstName, u.LastName })
                           .FirstOrDefaultAsync();

        

        if (result == null)
        {
            return "Peoplehawk";
        }

        return $"{result.FirstName} {result.LastName}";
    }

}
