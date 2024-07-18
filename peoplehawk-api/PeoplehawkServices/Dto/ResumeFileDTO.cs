using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace PeoplehawkServices.Dto
{
    public class ResumeFileDTO
    {
        public int Id { get; set; }
        public string? FileName { get; set; }
        public string? FilePath { get; set; }

        [Column(TypeName = "timestamp without time zone")]
        public DateTime UploadDate { get; set; }
    }
}
