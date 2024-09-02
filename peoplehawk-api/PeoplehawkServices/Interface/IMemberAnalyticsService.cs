using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Interface;
public interface IMemberAnalyticsService : IGenericService<MemberAnalytics>
{
    Task<List<MemberAnalyticsDTO>> GetList(int page, string? searchTerm = null, int? countryId = 0, string? memberType = null);
}
