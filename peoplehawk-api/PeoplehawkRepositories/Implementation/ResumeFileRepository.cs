using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories.Implementation;
public class ResumeFileRepository : GenericRepository<ResumeFile>, IResumeFileRepository
{
    private readonly ApplicationDbContext _context;

    public ResumeFileRepository(ApplicationDbContext context) : base(context) 
    {
        _context = context;
    }

}
