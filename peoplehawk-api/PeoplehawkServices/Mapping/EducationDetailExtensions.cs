using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Mapping;

public static class EducationDetailExtensions
{
    public static EducationDetailDto ToDto(this EducationDetail educationDetail)
    {
        return new EducationDetailDto
        {
            Id = educationDetail.Id,
            UserId = educationDetail.UserId,
            Comments = educationDetail.Comments,
            School = educationDetail.School,
            Subject = educationDetail.Subject,
            Grade = educationDetail.Grade,
            RewardedDate = educationDetail.RewardedDate,
        };
    }

    public static EducationDetail FromDto(this EducationDetailDto educationDetailDto)
    {
        return new EducationDetail
        {
            Id = educationDetailDto.Id,
            UserId = educationDetailDto.UserId,
            Comments = educationDetailDto.Comments,
            School = educationDetailDto.School,
            Subject = educationDetailDto.Subject,
            Grade= educationDetailDto.Grade,
            RewardedDate = educationDetailDto.RewardedDate
        };
    }

    public static List<EducationDetailDto> ToDtoList(this List<EducationDetail> educationDetails)
    {
        return educationDetails.Select((educationDetail) => educationDetail.ToDto()).ToList();  
    }
}
