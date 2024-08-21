using System.ComponentModel.DataAnnotations;

namespace PeoplehawkServices.Dto;
public class LoginDetails
{
    [Required]
    public string? email {  get; set; }

    [Required(ErrorMessage = "Password is required")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$",
                   ErrorMessage = "Password must be at least 8 characters long, include at least one lowercase letter, one uppercase letter, and one special character")]
    public string? password { get; set; }
}
