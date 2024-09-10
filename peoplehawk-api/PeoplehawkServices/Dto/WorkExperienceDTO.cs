using PeoplehawkServices.Common;
using System.ComponentModel.DataAnnotations;

namespace PeoplehawkServices.Dto;
public class WorkExperienceDTO
{
    public int Id { get; set; }
    public int UserId { get; set; }

    [Required(ErrorMessage = "Organisation name is required")]
    public string? organisation { get; set; }

    [Required(ErrorMessage = "role is required")]
    public string? Role { get; set; }

    public string? RoleDescription { get; set; }

    [Required(ErrorMessage = "startdate is required")]
    public DateTime? StartDate { get; set; }

    [Required(ErrorMessage = "endDate is required")]
    public DateTime? EndDate { get; set; }

    public bool IsOngoing { get; set; }
}
