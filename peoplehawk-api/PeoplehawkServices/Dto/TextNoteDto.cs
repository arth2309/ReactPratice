using PeoplehawkRepositories.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace PeoplehawkServices.Dto;
public class TextNoteDto
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public string? textNote { get; set; }
}
