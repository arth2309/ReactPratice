using System.Linq.Expressions;

namespace PeoplehawkRepositories.Interface
{
    public interface IGenericRepository<T> where T : class
    {
        Task<List<T>> GetAllAsync();

        Task<List<T>> GetAllWithIncludesAsync(params Expression<Func<T, object>>[] includeProperties);

        Task<T> GetByIdAsync(int id);

        Task<T> AddAsync(T entity);

        Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate);

        Task<T> DeleteAsync(Expression<Func<T, bool>> predicate);

        Task<T> UpdateAsync(T entity);

        Task<List<T>> GetByCriteria(Expression<Func<T, bool>> predicate);

        Task<T> LastOrDefaultAsync(Expression<Func<T, bool>> predicate);



    }
}
