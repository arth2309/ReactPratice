using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Interface;
public interface IMemberAnalyticsService : IGenericService<MemberAnalytics>
{

   Task<PaginatedList<MemberAnalyticsDTO>> GetList(
       int page,
       int userId,
       int typeId,
         bool isResume = false,
         bool isPersonalityTest = false,
      string sortOrder = "asc", int orderedBy = 0,
       bool isProfilePhoto = false, string? searchTerm = null, int? countryId = 0, string? memberType = null, int? clientId = 0);

    Task<PaginatedList<MemberAnalyticsDTO>> GetShortlistedList(int page, int shortlistIdint,int userId, int typeId);
}
