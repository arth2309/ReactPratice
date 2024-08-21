using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;


namespace PeoplehawkRepositories.Implementation;

public class CompentencyRepository : GenericRepository<Competency>,ICompentencyRepository
{
    private readonly ApplicationDbContext _context;

    public CompentencyRepository(ApplicationDbContext context) : base(context) 
    {
        _context = context;
    }
}
