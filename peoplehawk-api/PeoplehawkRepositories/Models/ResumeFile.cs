using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace PeoplehawkRepositories.Models
{
    public class ResumeFile
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }
        public string? FileName { get; set; }
        public string? FilePath { get; set; }

        [Column(TypeName = "timestamp without time zone")]
        public DateTime UploadDate { get; set; }
    }
}
