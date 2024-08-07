using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkServices.Interface
{
    public interface ICountryService : IGenericService<Country,CountryDTO>
    {
        Task<List<CountryDTO>> GetCountryList();
    }
}
