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

    Task<PaginatedList<MemberAnalyticsDTO>> GetList(
       int page,
       int userId,
       int typeId,
         bool isResume = false,
         bool isPersonalityTest = false,
      string sortOrder = "asc", int orderedBy = 0,
       bool isProfilePhoto = false, string? searchTerm = null, int? countryId = 0, string? memberType = null);
    
    }
