using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkRepositories.Implementation
{
    public class ChartRepository : GenericRepository<Chart>, IChartRepository
    {
        private readonly ApplicationDbContext _context;
        
        public ChartRepository(ApplicationDbContext context) : base(context) 
        {
            _context = context;
        }
    }
}
