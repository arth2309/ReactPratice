using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PeoplehawkRepositories.Models;
public class CandidateClient
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [ForeignKey("Candidate")]
    public int CandidateId { get; set;}

    [ForeignKey("Client")]
    public int ClientId { get; set;}

    public Candidate Candidate { get; set;}

    public Client Client { get; set;}
}
