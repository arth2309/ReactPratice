using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Interface;
public interface IWorkExperienceService : IGenericService<WorkExperience>
{
    Task<WorkExperienceDTO> AddData(WorkExperienceDTO workExperienceDTO);
    Task<WorkExperienceDTO> DeleteData(int Id);
    Task<WorkExperienceDTO> UpdateData(WorkExperienceDTO workExperienceDTO);
    Task<List<WorkExperienceDTO>> GetList(int UserId);
}
