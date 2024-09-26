namespace PeoplehawkServices.Dto;
public class UserDetailDTO
{

    public string? FirstName { get; set; }

    public string? LastName { get; set; }   

    public string? Email { get; set; }  
    public string? ProfilePhoto { get; set; }
    public ProgressDTO? UserProgress { get; set;}

    public string? MemberType { get; set; }

    public string? CountryName { get; set; }

    public List<WorkExperienceDTO>? WorkExperiences { get; set; }

    public string? AboutMe { get; set; }

    public List<AssignmentDTO>? Assignments { get; set; }

    public List<EducationDetailDto>? Educations { get; set;}

    public List<UserCompentencyDetailDTO>? userCompentencyDetails { get; set; }

    public List<CompetencyDTO>? competencies { get; set; }

    public List<CourseInterestDTO>? CourseInterestDetails { get; set;}

    public ChartDTO? ChartDetail { get; set; }

    public string? Resume { get; set; } 

    public QuizStatus QuizDetail { get; set; }

    public List<QuizDTO>? QuizQuestion { get; set; }

    public List<TextNoteDto>? TextNoteList { get; set; }

    public List<AudioNoteDTO>? AudioNoteList { get; set; }  
}
