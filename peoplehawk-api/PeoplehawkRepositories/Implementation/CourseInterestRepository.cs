using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories.Implementation
{
    public class CourseInterestRepository : GenericRepository<CourseInterest>, ICourseInterestRepository
    {
        private readonly ApplicationDbContext _context;
        public CourseInterestRepository(ApplicationDbContext context )  : base( context ) 
        {
            _context = context;
        }
    }
}
