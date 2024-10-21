namespace PeoplehawkServices.Dto;

public class ClientGetDto
{
    public int Id { get; set; }

    public string? Email { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? organisationCode { get; set; }

    public string? CountryName { get; set; }
    
    public bool isActive { get; set; }

    public string? profilePhoto { get; set; }
}
