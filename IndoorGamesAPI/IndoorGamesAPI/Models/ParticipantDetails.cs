using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IndoorGamesAPI.Models
{
    public class ParticipantDetails
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string? name { get; set; }

        public string? email { get; set; }

        public string? interested { get; set; }

        public  int? number { get; set; }

        public string[]? check { get; set; }

        public string? tableTennisType { get; set; }


    }
}
