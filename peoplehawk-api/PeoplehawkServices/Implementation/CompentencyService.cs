using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using PeoplehawkServices.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkServices.Implementation
{
    public class CompentencyService : GenericService<Competency>, ICompentencyService
    {
        private readonly ICompentencyRepository _compentencyRepository;

        public CompentencyService(ICompentencyRepository compentencyRepository) : base(compentencyRepository) 
        {
            _compentencyRepository = compentencyRepository;
        }

        public async  Task<List<CompetencyDTO>> GetList()
        {
            List<Competency> competencies =  await GetAllAsync();
            return competencies.ToDtoList();
        }
    }
}
