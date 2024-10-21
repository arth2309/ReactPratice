using System.ComponentModel.DataAnnotations;

namespace PeoplehawkServices.Dto
{
    public class ClientRegisterDto
    {
        public int Id { get; set; }

        [Required]
        public int AdminId { get; set; }

        [Required]
        public string? Email { get; set; }

        [Required]
        public string? FirstName { get; set; }

        [Required]
        public string? LastName { get; set; }

        [Required]
        public int RoleId { get; set; }

        [Required]
        public int CountryId { get; set; }

        [Required]
        public string? OrganisationCode { get; set; }
    }
}
