using System.ComponentModel.DataAnnotations;

namespace PeoplehawkServices.Dto;
public class PersonalityReportDTO
{
    [Required]
    public int Id { get; set; }

    [Required]
    public int QuizId { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    public float Answer { get; set; }

    [Required]
    public int TestNo { get; set; }
}