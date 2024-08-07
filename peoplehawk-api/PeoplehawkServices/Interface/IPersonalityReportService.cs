using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkServices.Interface
{
    public interface IPersonalityReportService : IGenericService<PersonalityReport,PersonalityReportDTO>
    {
        Task<List<PersonalityReportDTO>> AddQuizResult(List<PersonalityReportDTO> personalityReportDTOs);

        Task<PersonalityReportDTO> GetReport(int UserId);
    }
}
