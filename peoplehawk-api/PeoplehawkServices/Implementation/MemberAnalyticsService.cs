using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using PeoplehawkServices.Mapping;
using System.Linq.Expressions;

namespace PeoplehawkServices.Implementation;

public class MemberAnalyticsService : GenericService<MemberAnalytics>, IMemberAnalyticsService
{
    private readonly IMemberAnalyticsRepository _memberAnalyticsRepository;

    public MemberAnalyticsService(IMemberAnalyticsRepository memberAnalyticsRepository) : base(memberAnalyticsRepository)
    {
        _memberAnalyticsRepository = memberAnalyticsRepository;
    }

    public async Task<List<MemberAnalyticsDTO>> GetList(int page,string? searchTerm = null,int? countryId = 0,string? memberType = null)
    {
        var includes = new Expression<Func<MemberAnalytics, object>>[] { x => x.user,x => x.user.Country,x=> x.OwnedBy,x => x.completion};
        Expression<Func<MemberAnalytics,bool>> filter = a => 
        (countryId == 0 || a.user.CountryId == countryId) &&
        (searchTerm == null || a.user.FirstName.Contains(searchTerm)) &&
        (memberType == null || a.user.MemberType == memberType);
        
        List<MemberAnalytics> memberAnalytics = await _memberAnalyticsRepository.GetByCriteriaAsync(filter : filter,page : page, includes : includes, pageSize : 6);
        return memberAnalytics.ToDtoList();
    }
}
