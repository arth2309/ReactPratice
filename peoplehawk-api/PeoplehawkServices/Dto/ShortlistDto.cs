namespace PeoplehawkServices.Dto;
public class ShortlistDto
{
    public int Id { get; set; } 

    public string? name { get; set; }

    public int UserId { get; set; }

    public int? CreatedBy { get; set; }

    public bool IsFavourite { get; set; }
}
