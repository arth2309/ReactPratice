using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories.Implementation
{
    public class QuizRepository : GenericRepository<Quiz>, IQuizRepository
    {
        private readonly ApplicationDbContext _context;

        public QuizRepository(ApplicationDbContext context)  : base(context) 
        {
            _context = context;
        }
    }
}
