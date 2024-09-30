using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Interface;
public interface IMemberAnalyticsService : IGenericService<MemberAnalytics>
{
    Task<List<MemberAnalyticsDTO>> GetList(
          int page,
          bool isResume = false,
           bool isPersonalityTest = false,
          string sortOrder = "asc", int orderedBy = 0,
          bool isProfilePhoto = false, string? searchTerm = null, int? countryId = 0, string? memberType = null);
    Task<int> GetCount(bool isResume, bool isPersonalityTest = false, string sortOrder = "asc", int orderedBy = 0, bool isProfilePhoto = false, string? searchTerm = null, int? countryId = 0, string? memberType = null);
}
