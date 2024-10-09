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
}
