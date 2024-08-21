using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories.Implementation;
public class ChartRepository : GenericRepository<Chart>, IChartRepository
{
    private readonly ApplicationDbContext _context;
    
    public ChartRepository(ApplicationDbContext context) : base(context) 
    {
        _context = context;
    }
}
