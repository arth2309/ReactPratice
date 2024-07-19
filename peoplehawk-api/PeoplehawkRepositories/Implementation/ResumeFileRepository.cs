using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkRepositories.Implementation
{
    public class ResumeFileRepository : GenericRepository<ResumeFile>, IResumeFileRepository
    {
        private readonly ApplicationDbContext _context;

        public ResumeFileRepository(ApplicationDbContext context) : base(context) 
        {
            _context = context;
        }

    }
}
