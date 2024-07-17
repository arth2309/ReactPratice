using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace peoplehawk_api.Models
{
    public class ResumeFile
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("Chart")]
        public int UserId { get; set; }
        public Chart Chart { get; set; }
        public string? FileName { get; set; }
        public string? FilePath { get; set; }

        [Column(TypeName = "timestamp without time zone")]
        public DateTime UploadDate { get; set; }
    }
}
