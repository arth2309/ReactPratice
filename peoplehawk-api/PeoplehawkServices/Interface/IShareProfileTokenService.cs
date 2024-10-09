using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Interface;
public interface IShareProfileTokenService : IGenericService<ShareProfileToken>
{
    Task<ShareProfileToken> AddToken(ShareProfileTokenPostDto shareProfileTokenPostDto);
   
}
