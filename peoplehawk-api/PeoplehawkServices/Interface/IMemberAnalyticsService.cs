using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Interface;
public interface IMemberAnalyticsService : IGenericService<MemberAnalytics>
{
    Task<PaginatedList<MemberAnalyticsDTO>> GetList(
          int page,
          bool isResume = false,
           bool isPersonalityTest = false,
          string sortOrder = "asc", int orderedBy = 0,
          bool isProfilePhoto = false, string? searchTerm = null, int? countryId = 0, string? memberType = null);

    Task<PaginatedList<MemberAnalyticsDTO>> GetShortlistedList(int page, int shortlistId);
}
