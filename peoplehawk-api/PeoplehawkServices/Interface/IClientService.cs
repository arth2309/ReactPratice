using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Interface;

public interface IClientService : IGenericService<Client>
{
    Task<int> Register(ClientRegisterDto registerDto);
    Task<ClientGetDto> GetClientDetails(int Id);

    Task SendInvitationLink(string email);

    Task<PaginatedList<ClientGetDto>> GetClientList(int AdminId = 1);

    Task<bool> VerifyToken(string email,string token);
    Task<bool> CreatePassword(LoginDetails loginDetails);
}
