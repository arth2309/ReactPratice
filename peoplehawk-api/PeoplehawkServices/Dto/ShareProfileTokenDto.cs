namespace PeoplehawkServices.Dto;
public class ShareProfileTokenPostDto
{
    public int Id { get; set; }
    public string? email { get; set; }
    public string? Message { get; set; }
    public int linkExpireDuration { get; set; }
    public int UserId { get; set; }
}
