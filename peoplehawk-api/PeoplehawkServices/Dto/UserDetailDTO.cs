namespace PeoplehawkServices.Dto;
public class UserDetailDTO
{
    public string? ProfilePhoto { get; set; }
    public ProgressDTO? UserProgress { get; set;}

    public List<WorkExperienceDTO>? WorkExperiences { get; set; }

    public List<AssignmentDTO>? Assignments { get; set; }

    public List<EducationDetailDto>? Educations { get; set;}

    public List<UserCompentencyDetailDTO>? userCompentencyDetails { get; set; }

    public List<CompetencyDTO>? competencies { get; set; }

}
