using PeoplehawkRepositories.Models;


namespace PeoplehawkServices.Dto;
 public class MemberAnalyticsDTO
{
    public int UserId { get; set; }

    public string? FirstName { get; set; }

    public bool IsProfilePhoto { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public string? MemberType { get; set; }

    public Country country { get; set; }

    public Owner? OwnedBy { get; set; }

    public Completion Completion { get; set; }

    public bool? IsResumeUpload { get; set; }
}
