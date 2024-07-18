using Microsoft.EntityFrameworkCore;
using PeoplehawkRepositories.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkRepositories.Implementation
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private  readonly ApplicationDbContext _context;
        private readonly DbSet<T> _dbSet;

     

        public GenericRepository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }



        public async Task<List<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T> GetByIdAsync(int Id)
        {
            return await _dbSet.FindAsync(Id);
        }
    }
}
