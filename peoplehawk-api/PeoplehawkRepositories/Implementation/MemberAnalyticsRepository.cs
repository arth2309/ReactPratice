using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories.Implementation;

public class MemberAnalyticsRepository : GenericRepository<MemberAnalytics>, IMemberAnalyticsRepository
{
    private readonly ApplicationDbContext _context;

    public MemberAnalyticsRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
}
