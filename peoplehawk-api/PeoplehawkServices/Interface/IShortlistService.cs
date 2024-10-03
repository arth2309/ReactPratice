using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
namespace PeoplehawkServices.Interface;
public interface IShortlistService
{
    Task<ShortlistDto> AddShortlist(ShortlistDto shortlistDto);
    Task<ShortlistDto> DeleteShortlist(ShortlistDto shortlistDto);
    Task<ShortlistDto> UpdateShortlist(ShortlistDto shortlistDto);
    Task<ShortlistDto> AddUserinShortlist(ShortlistDto shortlistDto);
    Task<ShortlistDto> RemoveUserFromShortlist(ShortlistDto shortlistDto);
    Task<List<Shortlist>> GetAllShortlist();
}