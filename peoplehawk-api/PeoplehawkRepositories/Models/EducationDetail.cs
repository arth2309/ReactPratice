using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PeoplehawkRepositories.Models;
public class EducationDetail
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }

    public User user { get; set; }

    [Required(ErrorMessage = "school/ organisation name is required")]
    public string? School { get; set; }

    [Required(ErrorMessage = "subject is required")]
    public string? Subject { get; set; }

    [Required(ErrorMessage = "grade is required")]
    public string? Grade { get; set; }

    [Required(ErrorMessage = "date is required")]
    [Column(TypeName = "timestamp without time zone")]
    public DateTime? RewardedDate { get; set; }

    public string? Comments { get; set; }
}
