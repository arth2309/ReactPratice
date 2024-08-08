using PeoplehawkRepositories.Interface;
using PeoplehawkServices.Interface;
using System.Linq.Expressions;

namespace PeoplehawkServices.Implementation
{
    
    public class GenericService<T> : IGenericService<T> where T : class 
    {
        private readonly IGenericRepository<T> _genericRepository;
     
      

        public GenericService(IGenericRepository<T> genericRepository)
        {
            _genericRepository = genericRepository;
            
            
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _genericRepository.GetAllAsync();
           
        }

        public async Task<T> GetByIdAsync(int Id)
        {
            if (Id <=  0)
            {
                throw new ArgumentOutOfRangeException();
            }

            return await _genericRepository.GetByIdAsync(Id);
            
        }

        public async Task<T> DeleteAsync(Expression<Func<T, bool>> predicate)
        {
            return await _genericRepository.DeleteAsync(predicate);
            
        }

        public async Task<T> FirstorDefaultAsync(Expression<Func<T, bool>> predicate)
        {
             return await _genericRepository.FirstOrDefaultAsync(predicate);
        }

        public async Task<T> LastOrDefaultAsync(Expression<Func<T, bool>> predicate)
        {
            return await _genericRepository.LastOrDefaultAsync(predicate);
        }

        public async Task<T> AddAsync(T entity)
        {
            
            await _genericRepository.AddAsync(entity);
            return entity;
        }

        public async Task<List<T>> GetByCriteria(Expression<Func<T, bool>> predicate)
        {
            return await _genericRepository.GetByCriteria(predicate);
           
        }
    }
}
 