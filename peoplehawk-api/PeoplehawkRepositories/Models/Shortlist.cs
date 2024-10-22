using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PeoplehawkRepositories.Models
{
    public class Shortlist
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } 

        public string? Name { get; set; }

        [ForeignKey("User")]
        public int? CreatedBy { get; set; }

        public User User { get; set; }
    }
}