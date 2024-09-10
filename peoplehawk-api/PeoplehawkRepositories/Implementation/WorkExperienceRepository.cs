
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories.Implementation;

public class WorkExperienceRepository : GenericRepository<WorkExperience>, IWorkExperienceRepository
{
    private readonly ApplicationDbContext _context;

    public WorkExperienceRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
}
