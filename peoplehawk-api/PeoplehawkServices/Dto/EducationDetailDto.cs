using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace PeoplehawkServices.Dto
{
    public class EducationDetailDto
    {
     
        public int Id { get; set; }

        public int UserId { get; set; }

        [Required(ErrorMessage = "school/ organisation name is required")]
        public string? School { get; set; }

        [Required(ErrorMessage = "subject is required")]
        public string? Subject { get; set; }

        [Required(ErrorMessage = "grade is required")]
        public string? Grade { get; set; }

        [Required(ErrorMessage = "date is required")]
        public DateTime? RewardedDate { get; set; }

        public string? Comments { get; set; }
    }
}
