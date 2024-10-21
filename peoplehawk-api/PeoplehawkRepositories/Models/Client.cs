using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PeoplehawkRepositories.Models;
public class Client
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }

    public User User { get; set; }

    public string? OrganisationCode { get; set; }
    [ForeignKey("Admin")]
    public int? AdminId { get; set; }

    public bool isActive { get; set; }

    public bool isAllowed { get; set; }

    public Admin Admin { get; set; }
}
