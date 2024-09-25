using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PeoplehawkRepositories.Models;
public class AudioNote
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int? Id { get; set; }

    [ForeignKey("User")]
    public int? UserId { get; set; }

    public User User { get; set; }

    public string? filePath { get; set; }

    public DateTime SendDate { get; set; }
}
