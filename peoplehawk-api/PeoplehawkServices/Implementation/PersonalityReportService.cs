using AutoMapper;
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using PeoplehawkServices.Mapping;

namespace PeoplehawkServices.Implementation
{
    public class PersonalityReportService : GenericService<PersonalityReport>, IPersonalityReportService
    {
        private readonly IPersonalityReportRepository _personalityReportRepository;
        private readonly IMapper _mapper;
        public PersonalityReportService(IPersonalityReportRepository personalityReportRepository,IMapper mapper) : base(personalityReportRepository)
        {
            _personalityReportRepository = personalityReportRepository;
            _mapper = mapper;
        }

        public async Task<List<PersonalityReportDTO>> AddQuizResult(List<PersonalityReportDTO> personalityReportDTOs)
        {
            foreach(var personalityReportDTO in personalityReportDTOs)
            {
                var result = await AddAsync(personalityReportDTO.FromDto());
            }

            return personalityReportDTOs;
        }

       public async Task<QuizStatus> GetReport(int UserId)
        {
            QuizStatus quizStatus = new QuizStatus();
            PersonalityReport personalityReport = await LastOrDefaultAsync(x => x.UserId == UserId);
            if(personalityReport == null) 
            {
                quizStatus.IsFirstTestGiven = false;
                quizStatus.testNo = 0;
            }

            else if(personalityReport.TestNo < 3)
            {
                quizStatus.IsFirstTestGiven = true;
                quizStatus.testNo = personalityReport.TestNo;
            }

            else
            {
                quizStatus.IsFirstTestGiven = true;
                quizStatus.testNo = 3;
            }
            return quizStatus;
        }

    }
}
