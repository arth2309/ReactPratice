using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkServices.Interface
{
    public interface IGenericService<TModel, TDto> where TModel : class where TDto : class
    {
        Task<List<TDto>> GetAllAsync();

        Task<TDto> GetByIdAsync(int Id);

    }
}
