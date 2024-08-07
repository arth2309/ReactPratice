using AutoMapper;
using PeoplehawkRepositories.Interface;
using PeoplehawkServices.Interface;
using System.Linq.Expressions;

namespace PeoplehawkServices.Implementation
{
    
    public class GenericService<TModel,TDto> : IGenericService<TModel, TDto> where TModel : class where TDto : class
    {
        private readonly IGenericRepository<TModel> _genericRepository;
        private readonly IMapper _mapper;

        public GenericService(IGenericRepository<TModel> genericRepository, IMapper mapper)
        {
            _genericRepository = genericRepository;
            _mapper = mapper;
        }

        public async Task<List<TDto>> GetAllAsync()
        {
            var model = await _genericRepository.GetAllAsync();
            return _mapper.Map<List<TDto>>(model);
        }

        public async Task<TDto> GetByIdAsync(int Id)
        {
            if (Id <=  0)
            {
                throw new ArgumentOutOfRangeException();
            }

            var model = await _genericRepository.GetByIdAsync(Id);
            return _mapper.Map<TDto>(model);
        }

        public async Task<TDto> DeleteAsync(Expression<Func<TModel, bool>> predicate)
        {
            var model = await _genericRepository.DeleteAsync(predicate);
            return _mapper.Map<TDto>(model);    
        }

        public async Task<TDto> FirstorDefaultAsync(Expression<Func<TModel, bool>> predicate)
        {
            var model = await _genericRepository.FirstOrDefaultAsync(predicate);
            return _mapper.Map<TDto>(model);
        }

        public async Task<TDto> AddAsync(TDto tDto)
        {
            TModel model = _mapper.Map<TModel>(tDto);
            await _genericRepository.AddAsync(model);
            return tDto;
        }

        public async Task<List<TDto>> GetByCriteria(Expression<Func<TModel, bool>> predicate)
        {
            List<TModel> models = await _genericRepository.GetByCriteria(predicate);
            return _mapper.Map<List<TDto>>(models);
        }
    }
}
 