using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Interface;
public interface IShareProfileTokenService : IGenericService<ShareProfileToken>
{
    Task<ShareProfileToken> AddToken(ShareProfileTokenPostDto shareProfileTokenPostDto);
    Task SendEmailAsync(ShareProfileTokenPostDto shareProfileTokenPostDto);
    Task<UserDetailDTO> VerifyToken(string token);
    Task<List<ShareProfileTokenGetDto>> Getlist(int UserId);

    Task<ShareProfileTokenGetDto> DeleteItem (int Id);
}
