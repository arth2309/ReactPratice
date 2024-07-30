using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkRepositories.Interface
{
    public interface IGenericRepository<T> where T : class
    {
        Task<List<T>> GetAllAsync();

        Task<T> GetByIdAsync(int id);

        Task<T> AddAsync(T entity);

        Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate);

        Task<T> DeleteAsync(Expression<Func<T, bool>> predicate);

        Task<T> UpdateAsync(T entity);

        Task<List<T>> GetByCriteria(Expression<Func<T, bool>> predicate);

        Task<List<T>> GetPagedAsync(int pageNumber, int pageSize);

        Task<List<T>> GetSortedAsync(Expression<Func<T, object>> orderBy, bool isDescending = false);

        Task<IEnumerable<T>> GetFilteredAsync(
         Expression<Func<T, bool>> filter = null,
         Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
         int? pageNumber = null,
         int? pageSize = null);


    }
}
