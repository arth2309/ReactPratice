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

        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<T> AddAsync(T entity)
        {
            await  _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.FirstOrDefaultAsync(predicate);
        }

       

        public async Task<T> DeleteAsync(Expression<Func<T, bool>> predicate)
        {
            T entity = await _dbSet.FirstOrDefaultAsync(predicate);
             _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<T> UpdateAsync(T entity)
        {
            _dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<List<T>> GetByCriteria (Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.Where(predicate).ToListAsync();
        }

       
        public async Task<List<T>> GetPagedAsync(int pageNumber, int pageSize)
        {
            return await _dbSet.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        }

        public async Task<List<T>> GetSortedAsync(Expression<Func<T, object>> orderBy, bool isDescending = false)
        {
            IQueryable<T> query = _dbSet;

            if (isDescending)
            {
                query = query.OrderByDescending(orderBy);
            }
            else
            {
                query = query.OrderBy(orderBy);
            }

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<T>> GetFilteredAsync(
         Expression<Func<T, bool>> filter = null,
         Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
         int? pageNumber = null,
         int? pageSize = null)
        {
            IQueryable<T> query = _dbSet;

            // Apply filter if provided
            if (filter != null)
            {
                query = query.Where(filter);
            }

            // Apply sorting if provided
            if (orderBy != null)
            {
                query = orderBy(query);
            }

            // Apply pagination if provided
            if (pageNumber != null && pageSize != null)
            {
                query = query.Skip((pageNumber.Value - 1) * pageSize.Value).Take(pageSize.Value);
            }

            return await query.ToListAsync();
        }




    }
}
