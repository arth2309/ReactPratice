using AutoMapper;
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using PeoplehawkServices.Mapping;

namespace PeoplehawkServices.Implementation;

public class PersonalityReportService : GenericService<PersonalityReport>, IPersonalityReportService
{
    private readonly IPersonalityReportRepository _personalityReportRepository;
    private readonly IQuizRepository _quizRepository;
    private readonly IMapper _mapper;
    public PersonalityReportService(IPersonalityReportRepository personalityReportRepository,IMapper mapper,IQuizRepository quizRepository) : base(personalityReportRepository)
    {
        _personalityReportRepository = personalityReportRepository;
        _mapper = mapper;
        _quizRepository = quizRepository;
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
            quizStatus.quizResponse = null;
        }

        else if(personalityReport.TestNo < 3)
        {
            List<PersonalityReport> quizResults = await _personalityReportRepository.GetByCriteriaAsync(filter: x => x.UserId == UserId && x.TestNo == personalityReport.TestNo);
            quizStatus.IsFirstTestGiven = true;
            quizStatus.testNo = personalityReport.TestNo;
            quizStatus.quizResponse = quizResults.OrderBy(x => x.Id).TakeLast(10).Select(p => p.ToDto()).ToList();
        }

        else
        {
            List<PersonalityReport> quizResults = await _personalityReportRepository.GetByCriteriaAsync(filter: x => x.UserId == UserId && x.TestNo == 3);
            quizStatus.IsFirstTestGiven = true;
            quizStatus.testNo = 3;
            quizStatus.quizResponse = quizResults.OrderBy(x => x.Id).TakeLast(10).Select(p => p.ToDto()).ToList();
        }
        return quizStatus;
    }
}
