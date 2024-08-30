using PeoplehawkRepositories.Models;


namespace PeoplehawkServices.Dto;
 public class MemberAnalyticsDTO
{
    public int UserId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public Country country { get; set; }

    public bool? IsResumeUpload { get; set; }
}
