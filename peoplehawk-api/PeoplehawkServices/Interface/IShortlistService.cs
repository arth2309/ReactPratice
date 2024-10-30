using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
namespace PeoplehawkServices.Interface;
public interface IShortlistService
{
    Task<ShortlistDto> AddShortlist(ShortlistDto shortlistDto);
    Task<ShortlistDto> DeleteShortlist(int ShortlistId);
    Task<ShortlistDto> UpdateShortlist(ShortlistDto shortlistDto);
    Task<ShortlistDto> AddUserinShortlist(ShortlistDto shortlistDto);
    Task<ShortlistDto> RemoveUserFromShortlist(int UserId, int ShortlistId);
    Task<ShortlistListDto> GetAllShortlist(int id);
}