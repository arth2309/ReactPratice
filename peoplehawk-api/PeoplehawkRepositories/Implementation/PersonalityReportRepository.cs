using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories.Implementation
{
     public class PersonalityReportRepository : GenericRepository<PersonalityReport>, IPersonalityReportRepository
    {
        private readonly ApplicationDbContext _context;

        public PersonalityReportRepository(ApplicationDbContext context) : base(context) 
        {
            _context = context;
        }
    }
}
