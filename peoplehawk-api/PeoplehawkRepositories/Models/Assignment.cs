

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PeoplehawkRepositories.Models;

public class Assignment
{

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }

    public User User { get; set; }

    public string? organisation { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? InfohraphicResumeDescription { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set;}

    public bool IsOngoing { get; set; }
}
