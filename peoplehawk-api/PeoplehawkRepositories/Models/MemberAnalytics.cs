using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PeoplehawkRepositories.Models;
public class MemberAnalytics
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }

    [ForeignKey("Completion")]
    public int? CompletionId { get; set; }

    [ForeignKey("Owner")]
    public int? OwnerId { get; set; }

    public User user { get; set; }

    public Owner OwnedBy { get; set; }

    public Completion completion { get; set; }

}
