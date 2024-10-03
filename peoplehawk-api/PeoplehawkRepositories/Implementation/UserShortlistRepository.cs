using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
namespace PeoplehawkRepositories.Implementation;
public class UserShortlistRepository : GenericRepository<UserShortlist>, IUserShortlistRepository
{
    private readonly ApplicationDbContext _context;

    public UserShortlistRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
}