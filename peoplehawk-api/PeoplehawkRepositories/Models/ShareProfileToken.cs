using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PeoplehawkRepositories.Models;
public class ShareProfileToken
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    public string? Token { get; set; }

    [Column(TypeName = "timestamp without time zone")]
    public DateTime ExpirationDate { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }

    public User User { get; set; }
}
