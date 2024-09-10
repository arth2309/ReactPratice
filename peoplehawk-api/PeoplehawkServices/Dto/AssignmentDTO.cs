using System.ComponentModel.DataAnnotations;

namespace PeoplehawkServices.Dto;
public class AssignmentDTO
{
    public int Id { get; set; }

    public int UserId { get; set; }

    [Required(ErrorMessage = "Organisation name is required")]
    public string? organisation { get; set; }

    [Required(ErrorMessage = "title is required")]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? InfohraphicResumeDescription { get; set; }

    [Required(ErrorMessage = "startdate is required")]
    public DateTime? StartDate { get; set; }

    [Required(ErrorMessage = "endDate is required")]
    public DateTime? EndDate { get; set; }

    public bool IsOngoing { get; set; }
}
