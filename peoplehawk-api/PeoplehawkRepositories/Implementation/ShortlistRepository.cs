using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
namespace PeoplehawkRepositories.Implementation;
public class ShortlistRepository : GenericRepository<Shortlist>,IShortlistRepository
{
    private readonly ApplicationDbContext _context;
    public ShortlistRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
}