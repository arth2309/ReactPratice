using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PeoplehawkRepositories.Models;
public class PersonalityReport
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [ForeignKey("Quiz")]
    public int QuizId { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }

    public float Answer { get; set; }

    public int TestNo { get; set; }

    public User user { get; set; }

    public Quiz quiz { get; set; }
}
