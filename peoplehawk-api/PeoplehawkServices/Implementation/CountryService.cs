using AutoMapper;
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;

namespace PeoplehawkServices.Implementation;
public class CountryService : GenericService<Country>,ICountryService
{
    private readonly ICountryRepository _countryRepository;
    private readonly IMapper _mapper;

    public CountryService(ICountryRepository countryRepository,IMapper mapper) : base(countryRepository) 
    {
        _countryRepository = countryRepository;
        _mapper = mapper;
    }

    public async Task<List<CountryDTO>> GetCountryList()
    {
        List<Country> country = await GetAllAsync();
        return _mapper.Map<List<CountryDTO>>(country);
    }
}
