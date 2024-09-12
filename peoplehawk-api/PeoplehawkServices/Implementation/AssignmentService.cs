using PeoplehawkRepositories.Implementation;
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using PeoplehawkServices.Mapping;

namespace PeoplehawkServices.Implementation;

public class AssignmentService : GenericService<Assignment>, IAssignmentService
{
    private readonly IAssignmentRepository _assignmentRepository;

    public AssignmentService(IAssignmentRepository assignmentRepository) : base(assignmentRepository)
    {
        _assignmentRepository = assignmentRepository;
    }

    public async Task<AssignmentDTO> AddData(AssignmentDTO assignmentDTO)
    {
   
          var entites =  await AddAsync(assignmentDTO.FromDto());
              return entites.ToDto();
    }

    public async Task<AssignmentDTO> DeleteData(int Id)
    {
        var model = await DeleteAsync(x => x.Id == Id);
        return model.ToDto();
    }

    public async Task<AssignmentDTO> UpdateData(AssignmentDTO assignmentDTO)
    {
        await _assignmentRepository.UpdateAsync(assignmentDTO.FromDto());
        return assignmentDTO;
    }

    public async Task<List<AssignmentDTO>> GetList(int UserId)
    {
        var entities = await _assignmentRepository.GetByCriteriaAsync(filter: x => x.UserId == UserId);
        return entities.ToDtoList();
    }
}
