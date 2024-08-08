using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Interface
{
    public interface IPersonalityReportService : IGenericService<PersonalityReport>
    {
        Task<List<PersonalityReportDTO>> AddQuizResult(List<PersonalityReportDTO> personalityReportDTOs);

        Task<QuizStatus> GetReport(int UserId);
    }
}
