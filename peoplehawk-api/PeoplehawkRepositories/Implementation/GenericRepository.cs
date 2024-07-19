using Microsoft.EntityFrameworkCore;
using PeoplehawkRepositories.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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

        public async Task<T> AddAsync(T t)
        {
            await  _dbSet.AddAsync(t);
            await _context.SaveChangesAsync();
            return t;
        }

        public async Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.FirstOrDefaultAsync(predicate);
        }

        public async Task<T> DeleteAsync(Expression<Func<T, bool>> predicate)
        {
            T t = await _dbSet.FirstOrDefaultAsync(predicate);
             _dbSet.Remove(t);
            await _context.SaveChangesAsync();
            return t;
        }

        public async Task<T> UpdateAsync(T t)
        {
            _dbSet.Attach(t);
            _context.Entry(t).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return t;
        }
    }
}
