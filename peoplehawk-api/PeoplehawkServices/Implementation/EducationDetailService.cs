using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using PeoplehawkServices.Mapping;
using System.Runtime.CompilerServices;

namespace PeoplehawkServices.Implementation;

public class EducationDetailService : GenericService<EducationDetail>, IEducationDetailService
{
    private readonly IEducationDetailRepository _educationDetailRepository;

    public EducationDetailService(IEducationDetailRepository educationDetailRepository) : base(educationDetailRepository)
    {
        _educationDetailRepository = educationDetailRepository;
    }

    public async Task<List<EducationDetailDto>> AddData(List<EducationDetailDto> educationDetailDtos)
    {
        foreach (var educationDetailDto in educationDetailDtos)
        {
            educationDetailDto.RewardedDate = DateTime.Now;
            await AddAsync(educationDetailDto.FromDto());
        }
         return educationDetailDtos;
    }

    public async Task<EducationDetailDto> DeleteData(int Id)
    {
       var model =  await DeleteAsync(x => x.Id == Id);
        return model.ToDto();
    }

    public async Task<EducationDetailDto> UpdateData(EducationDetailDto educationDetailDto)
    {
        await _educationDetailRepository.UpdateAsync(educationDetailDto.FromDto());
        return educationDetailDto;
    }

    public async Task<List<EducationDetailDto>> GetList(int UserId)
    {
        var entities = await _educationDetailRepository.GetByCriteriaAsync(filter: x => x.UserId == UserId);
        return entities.ToDtoList();
    }
}
