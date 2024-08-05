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
     
        public int Id { get; set; }

        public int QuizId { get; set; }
       
        public int UserId { get; set; }

        public float Answer { get; set; }

        public int TestNo { get; set; }

       
    }
}
