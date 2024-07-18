using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkRepositories.Models
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
