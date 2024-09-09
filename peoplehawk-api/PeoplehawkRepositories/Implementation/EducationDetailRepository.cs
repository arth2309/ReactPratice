using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories.Implementation;
public class EducationDetailRepository : GenericRepository<EducationDetail>, IEducationDetailRepository
{
    private readonly ApplicationDbContext _context;
    public EducationDetailRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
}
