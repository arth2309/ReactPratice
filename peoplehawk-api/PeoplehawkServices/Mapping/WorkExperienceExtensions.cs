using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Mapping;
public static class WorkExperienceExtensions
{
    public static WorkExperienceDTO ToDto(this WorkExperience workExperience)
    {
        return new WorkExperienceDTO
        {
            Id = workExperience.Id,
            UserId = workExperience.UserId,
            RoleDescription = workExperience.RoleDescription,
            Role = workExperience.Role,
            StartDate = workExperience.StartDate,
            EndDate = workExperience.EndDate,
            organisation = workExperience.organisation,
            IsOngoing = workExperience.IsOngoing
        };
    }

    public static WorkExperience FromDto(this WorkExperienceDTO workExperienceDTO)
    {
        return new WorkExperience
        {
            Id = workExperienceDTO.Id,
            UserId = workExperienceDTO.UserId,
            Role = workExperienceDTO.Role,
            RoleDescription = workExperienceDTO.RoleDescription,
            StartDate = workExperienceDTO .StartDate,
            EndDate = workExperienceDTO .EndDate,   
            organisation = workExperienceDTO.organisation,
            IsOngoing= workExperienceDTO .IsOngoing
        };
    }

    public static List<WorkExperienceDTO> ToDtoList (this List<WorkExperience> workExperiences) 
    {
        return workExperiences.Select((workExperience) => workExperience.ToDto()).ToList();
    }
}
