using System.Linq.Expressions;


namespace PeoplehawkServices.Interface
{
    public interface IGenericService<T> where T : class 
    {
        Task<List<T>> GetAllAsync();

        Task<T> GetByIdAsync(int Id);

        Task<T> DeleteAsync(Expression<Func<T, bool>> predicate);

        Task<T> FirstorDefaultAsync(Expression<Func<T, bool>> predicate);

        Task<T> LastOrDefaultAsync(Expression<Func<T, bool>> predicate);

        Task<T> AddAsync(T entity);

       

    }
}
