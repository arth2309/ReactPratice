using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
namespace PeoplehawkServices.Dto;
public class AudioNotePostDto
{
   [Required(ErrorMessage = "please enter UserId")]
   public int UserId { get; set; }

    [Required(ErrorMessage = "please provide file")]
    public IFormFile? formFile { get; set; }
}
