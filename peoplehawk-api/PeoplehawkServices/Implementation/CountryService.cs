using AutoMapper;
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkServices.Implementation
{
    public class CountryService : GenericService<Country,CountryDTO>,ICountryService
    {
        private readonly ICountryRepository _countryRepository;
        private readonly IMapper _mapper;

        public CountryService(ICountryRepository countryRepository,IMapper mapper) : base(countryRepository,mapper) 
        {
            _countryRepository = countryRepository;
            _mapper = mapper;
        }

        public async Task<List<CountryDTO>> GetCountryList()
        {
            List<Country> country = await _countryRepository.GetAllAsync();
            return _mapper.Map<List<CountryDTO>>(country);
        }
    }
}
