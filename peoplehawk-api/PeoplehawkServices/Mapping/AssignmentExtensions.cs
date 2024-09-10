using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Mapping;

public static class AssignmentExtensions
{
    public static AssignmentDTO ToDto(this Assignment assignment)
    {
        return new AssignmentDTO
        {
            Id = assignment.Id,
            UserId = assignment.UserId,
            InfohraphicResumeDescription = assignment.InfohraphicResumeDescription,
            Description = assignment.Description,
            Title = assignment.Title,
            organisation = assignment.organisation,
            StartDate = assignment.StartDate,
            EndDate = assignment.EndDate,
            IsOngoing = assignment.IsOngoing,
        };
    }

    public static Assignment FromDto(this AssignmentDTO assignmentDTO)
    {
        return new Assignment
        {
            Id = assignmentDTO.Id,
            UserId = assignmentDTO.UserId,
            InfohraphicResumeDescription = assignmentDTO.InfohraphicResumeDescription,
            Description = assignmentDTO.Description,
            Title = assignmentDTO.Title,
            organisation = assignmentDTO.organisation,
            StartDate = assignmentDTO.StartDate,
            EndDate = assignmentDTO.EndDate,
            IsOngoing = assignmentDTO.IsOngoing,
        };
    }

    public static List<AssignmentDTO> ToDtoList(this List<Assignment> assignments) 
    {
        return assignments.Select((assignment) => assignment.ToDto()).ToList();
    }
}
