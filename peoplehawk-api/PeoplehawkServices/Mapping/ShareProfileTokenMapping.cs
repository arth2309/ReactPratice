using PeoplehawkRepositories.Models;
using PeoplehawkServices.Common;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Mapping;
public static class ShareProfileTokenMapping
{
    public static ShareProfileToken FromDto(this ShareProfileTokenPostDto shareProfileTokenPostDto)
    {
        return new ShareProfileToken{
            Id = shareProfileTokenPostDto.Id,
            Token = TokenGenerator.GenerateToken(),
            ExpirationDate = DateTime.Now.AddDays(shareProfileTokenPostDto.linkExpireDuration),
            UserId = shareProfileTokenPostDto.UserId
        };
    }

    public static ShareProfileTokenGetDto ToDto(this ShareProfileToken shareProfileToken)
    {
        TimeSpan duration = shareProfileToken.ExpirationDate - DateTime.Now;

        return new ShareProfileTokenGetDto
        {
            Id = shareProfileToken.Id,
            Token = shareProfileToken.Token,
            DayToExpire = (int)duration.TotalDays
        };
    }

    public static List<ShareProfileTokenGetDto> ToDtolist(this List<ShareProfileToken> shareProfileTokens) 
    {
       return shareProfileTokens.Select(shareProfileToken => shareProfileToken.ToDto()).ToList(); 
    }
}
