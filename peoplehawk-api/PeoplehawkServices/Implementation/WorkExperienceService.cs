using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using PeoplehawkServices.Mapping;

namespace PeoplehawkServices.Implementation;
public class WorkExperienceService : GenericService<WorkExperience>, IWorkExperienceService
{

    private readonly IWorkExperienceRepository _workExperienceRepository;
    public WorkExperienceService(IWorkExperienceRepository workExperienceRepository) : base(workExperienceRepository)
    {
       _workExperienceRepository = workExperienceRepository;
    }

    public async Task<WorkExperienceDTO> AddData(WorkExperienceDTO workExperienceDTO)
    {

        var entities = await AddAsync(workExperienceDTO.FromDto());
        return entities.ToDto();
    }

    public async Task<WorkExperienceDTO> DeleteData(int Id)
    {
        var model = await DeleteAsync(x => x.Id == Id);
        return model.ToDto();
    }

    public async Task<WorkExperienceDTO> UpdateData(WorkExperienceDTO workExperienceDTO)
    {
        await _workExperienceRepository.UpdateAsync(workExperienceDTO.FromDto());
        return workExperienceDTO;
    }

    public async Task<List<WorkExperienceDTO>> GetList(int UserId)
    {
        var entities = await _workExperienceRepository.GetByCriteriaAsync(filter: x => x.UserId == UserId);
        return entities.ToDtoList();
    }
}
