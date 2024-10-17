using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PeoplehawkRepositories.Models;

public class Admin
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }

    public User User { get; set; }

    
}
