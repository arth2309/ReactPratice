using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    public class PersonalityReportService : GenericService<PersonalityReport,PersonalityReportDTO>, IPersonalityReportService
    {
        private readonly IPersonalityReportRepository _personalityReportRepository;
        private readonly IMapper _mapper;
        public PersonalityReportService(IPersonalityReportRepository personalityReportRepository,IMapper mapper) : base(personalityReportRepository,mapper)
        {
            _personalityReportRepository = personalityReportRepository;
            _mapper = mapper;
        }

        public async Task<List<PersonalityReportDTO>> AddQuizResult(List<PersonalityReportDTO> personalityReportDTOs)
        {
            foreach(var personalityReportDTO in personalityReportDTOs)
            {
                var result = await _personalityReportRepository.AddAsync(personalityReportDTO.FromDto());
            }

            return personalityReportDTOs;
        }

       public async Task<PersonalityReportDTO> GetReport(int UserId)
        {
            PersonalityReport personalityReport = await _personalityReportRepository.FirstOrDefaultAsync(x => x.UserId == UserId);
            return _mapper.Map<PersonalityReportDTO>(personalityReport);
        }

    }
}
