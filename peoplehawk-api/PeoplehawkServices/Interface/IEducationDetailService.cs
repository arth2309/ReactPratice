using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Interface;
public interface IEducationDetailService : IGenericService<EducationDetail>
{
    Task<List<EducationDetailDto>> AddData(List<EducationDetailDto> educationDetailDtos);
    Task<EducationDetailDto> DeleteData(int Id);
    Task<EducationDetailDto> UpdateData(EducationDetailDto educationDetailDto);
    Task<List<EducationDetailDto>> GetList(int UserId);
}
