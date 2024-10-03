using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Mapping;
public static class ShortlistExtensions
{
    public static ShortlistDto ToDto(this Shortlist shortlist)
    {
        return new ShortlistDto
        {
            Id = shortlist.Id,
            name = shortlist.Name,
        };
    }

    public static Shortlist FromDto(this ShortlistDto shortlistDto) 
    {
        return new Shortlist
        {
            Id = shortlistDto.Id,
           Name = shortlistDto.name
        };
    }
}
