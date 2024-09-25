using System.ComponentModel.DataAnnotations.Schema;

namespace PeoplehawkRepositories.Models;

public class TextNote
{
    public int Id { get; set; }

    [ForeignKey("User")]
    public int? UserId { get; set; }

    public User User { get; set; }

    public string? textNote { get; set; }

    public DateTime SendDate { get; set; }
}
