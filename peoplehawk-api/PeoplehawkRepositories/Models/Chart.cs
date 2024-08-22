using System.ComponentModel.DataAnnotations.Schema;

namespace PeoplehawkRepositories.Models;
public class Chart
{
    public int Id { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }

    public User User { get; set; }

    public int A { get; set; }

    public int C { get; set; }

    public int E { get; set; }

    public int I { get; set; }

    public int R { get; set; }

    public int S { get; set; }

    public string career_code { get; set; }

    public DateTime created_at { get; set; }
}
