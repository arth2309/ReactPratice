using Microsoft.EntityFrameworkCore;
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
