using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;


namespace PeoplehawkServices.Interface
{
    public interface ICountryService : IGenericService<Country>
    {
        Task<List<CountryDTO>> GetCountryList();
    }
}
