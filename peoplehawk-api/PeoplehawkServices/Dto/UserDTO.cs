using System.ComponentModel.DataAnnotations;

namespace PeoplehawkServices.Dto;
public class UserDTO
{
    public int Id { get; set; }

    [Required]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Password is required")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$",
                   ErrorMessage = "Password must be at least 8 characters long, include at least one lowercase letter, one uppercase letter, and one special character")]
    public string? Password { get; set; }

    [Required]
    public string? FirstName { get; set; }

    [Required]
    public string? LastName { get; set; }

    [Required]
    public string? MemberType { get; set; }

    [Required]
    public int CountryId { get; set; }

    public string? OrganisationCode { get; set; }

    [Required]
    public int? RoleId { get; set; }

    public string? AboutMe { get; set; }

}
