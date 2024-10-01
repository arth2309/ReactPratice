using System.ComponentModel.DataAnnotations.Schema;

namespace PeoplehawkRepositories.Models;
  public class Completion
{
    public int Id { get; set; }

    [ForeignKey("User")]
    public int? UserId { get; set; }

    public User User { get; set; }

    public bool IsPersonalityQuizGiven { get; set;}

    public bool IsGames { get; set;}

    public bool IsVideoInterview { get; set;}

    public bool IsCVOptimized { get; set;}

    public bool IsCompentencyQuizGiven { get; set;}

    public bool IsDocumentGiven { get; set;}

    public bool IsCVUploaded { get; set;}

}
