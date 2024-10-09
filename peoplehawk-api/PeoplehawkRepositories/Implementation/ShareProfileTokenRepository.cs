using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
namespace PeoplehawkRepositories.Implementation;
public class ShareProfileTokenRepository : GenericRepository<ShareProfileToken>,IShareProfileTokenRepository
{
    private readonly ApplicationDbContext _context;
    public ShareProfileTokenRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
}