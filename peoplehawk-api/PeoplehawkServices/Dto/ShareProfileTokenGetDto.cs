namespace PeoplehawkServices.Dto;
public class ShareProfileTokenGetDto
{
    public int Id { get; set; }
    public string? Token { get; set; }
    public int ? DayToExpire { get; set; }
}
