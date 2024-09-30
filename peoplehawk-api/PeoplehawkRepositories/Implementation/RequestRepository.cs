using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories.Implementation;

public class RequestRepository : GenericRepository<Request>, IRequestRepository
{

    private readonly ApplicationDbContext _context;
    public RequestRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
}
