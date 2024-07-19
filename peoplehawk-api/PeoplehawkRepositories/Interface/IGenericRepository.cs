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

        Task<T> GetByIdAsync(int Id);

        Task<T> AddAsync(T t);

        Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate);

        Task<T> DeleteAsync(Expression<Func<T, bool>> predicate);

        Task<T> UpdateAsync(T t);

    }
}
