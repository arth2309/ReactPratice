using PeoplehawkRepositories.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkServices.Dto
{
    public class PersonalityReportDTO
    {

        [Required]
        public int Id { get; set; }

        [Required]
        public int QuizId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public float Answer { get; set; }

        [Required]
        public int TestNo { get; set; }

       
    }
}
