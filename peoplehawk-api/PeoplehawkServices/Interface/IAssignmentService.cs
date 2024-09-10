using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;


namespace PeoplehawkServices.Interface
{
    public interface IAssignmentService : IGenericService<Assignment>
    {
        Task<AssignmentDTO> AddData(AssignmentDTO assignmentDTO);
        Task<AssignmentDTO> DeleteData(int Id);
        Task<AssignmentDTO> UpdateData(AssignmentDTO assignmentDTO);
        Task<List<AssignmentDTO>> GetList(int UserId);
    }
}
