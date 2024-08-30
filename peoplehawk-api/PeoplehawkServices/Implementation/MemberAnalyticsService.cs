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

    public async Task<List<MemberAnalyticsDTO>> GetList(int page)
    {
        var includes = new Expression<Func<MemberAnalytics, object>>[] { x => x.user,x => x.user.Country};
        List<MemberAnalytics> memberAnalytics = await _memberAnalyticsRepository.GetByCriteriaAsync(page : page, includes : includes, pageSize : 6);
        return memberAnalytics.ToDtoList();
    }
}
