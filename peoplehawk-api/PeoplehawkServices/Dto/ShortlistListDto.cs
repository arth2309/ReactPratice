using PeoplehawkRepositories.Models;

namespace PeoplehawkServices.Dto;
public class ShortlistListDto
{
    public List<Shortlist> FavouriteShortlist { get; set; }
    public List<Shortlist> Shortlist { get; set; }
}
