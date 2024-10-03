using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PeoplehawkRepositories.Models
{
    public class UserShortlist
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("Shortlist")]
        public int ShortlistId { get; set; }

        public Shortlist Shortlists { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public User Users { get; set; }

    }
}
