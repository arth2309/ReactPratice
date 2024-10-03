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
    private readonly IUserShortlistRepository _userShortlistRepository;
    private readonly IShortlistRepository _shortlistRepository;

    public MemberAnalyticsService(IMemberAnalyticsRepository memberAnalyticsRepository, IUserShortlistRepository userShortlistRepository, IShortlistRepository shortlistRepository) : base(memberAnalyticsRepository)
    {
        _memberAnalyticsRepository = memberAnalyticsRepository;
        _userShortlistRepository = userShortlistRepository;
        _shortlistRepository = shortlistRepository;
    }

    public async Task<List<MemberAnalyticsDTO>> GetList(
        int page,
          bool isResume = false,
          bool isPersonalityTest = false,
       string sortOrder = "asc", int orderedBy = 0,
        bool isProfilePhoto = false, string? searchTerm = null, int? countryId = 0, string? memberType = null)
    {
        var includes = new Expression<Func<MemberAnalytics, object>>[] { x => x.user, x => x.user.Country, x => x.OwnedBy, x => x.completion };
        Expression<Func<MemberAnalytics, bool>> filter = a =>
        (countryId == 0 || a.user.CountryId == countryId) &&
        (searchTerm == null || a.user.FirstName.ToLower().Contains(searchTerm.ToLower())) &&
        (memberType == null || a.user.MemberType == memberType) &&
        (!isProfilePhoto || a.user.ProfilePhoto != null) &&
        (!isResume || a.completion.IsCVUploaded) &&
        (!isPersonalityTest || a.completion.IsPersonalityQuizGiven);

        Func<IQueryable<MemberAnalytics>, IOrderedQueryable<MemberAnalytics>> orderBy;

        if (orderedBy == 2)
        {
            orderBy = sortOrder.ToLower() switch
            {
                "asc" => q => q.OrderBy(u => u.user.FirstName),
                "desc" => q => q.OrderByDescending(u => u.user.FirstName),
                _ => q => q.OrderBy(u => u.Id)
            };
        }

        else
        {
            orderBy = sortOrder.ToLower() switch
            {
                "asc" => q => q.OrderBy(u => u.Id),
                "desc" => q => q.OrderByDescending(u => u.user.Id),
                _ => q => q.OrderBy(u => u.Id)
            };
        }

        List<MemberAnalytics> memberAnalytics = await _memberAnalyticsRepository.GetByCriteriaAsync(filter: filter, page: page, includes: includes, pageSize: 6, orderBy: orderBy);
        List<MemberAnalyticsDTO> memberAnalyticsDTOs =  new List<MemberAnalyticsDTO>();
        
 
        foreach(var member in memberAnalytics) 
        {
            MemberAnalyticsDTO dto = member.ToDto();
             var userShortlist = await _userShortlistRepository.GetByCriteriaAsync(filter : x => x.UserId == member.UserId ,includes: x => x.Shortlists);
            dto.Shortlist = userShortlist.Select(x => x.Shortlists).ToList();
            memberAnalyticsDTOs.Add(dto);
        }
        
        return memberAnalyticsDTOs;
    }
    public async Task<int> GetCount(
        bool isResume = false,
         bool isPersonalityTest = false,
        string sortOrder = "asc", int orderedBy = 0,
        bool isProfilePhoto = false, string? searchTerm = null, int? countryId = 0, string? memberType = null)
    {
        var includes = new Expression<Func<MemberAnalytics, object>>[] { x => x.user, x => x.user.Country, x => x.OwnedBy, x => x.completion };
        Expression<Func<MemberAnalytics, bool>> filter = a =>
        (countryId == 0 || a.user.CountryId == countryId) &&
        (searchTerm == null || a.user.FirstName.ToLower().Contains(searchTerm.ToLower())) &&
        (memberType == null || a.user.MemberType == memberType) &&
        (!isProfilePhoto || a.user.ProfilePhoto != null) &&
        (!isResume || a.completion.IsCVUploaded)&&
        (!isPersonalityTest || a.completion.IsPersonalityQuizGiven); ;
        

        Func<IQueryable<MemberAnalytics>, IOrderedQueryable<MemberAnalytics>> orderBy;

        if (orderedBy == 2)
        {
            orderBy = sortOrder.ToLower() switch
            {
                "asc" => q => q.OrderBy(u => u.user.FirstName),
                "desc" => q => q.OrderByDescending(u => u.user.FirstName),
                _ => q => q.OrderBy(u => u.Id)
            };
        }

        else
        {
            orderBy = sortOrder.ToLower() switch
            {
                "asc" => q => q.OrderBy(u => u.Id),
                "desc" => q => q.OrderByDescending(u => u.user.Id),
                _ => q => q.OrderBy(u => u.Id)
            };
        }

        List<MemberAnalytics> memberAnalytics = await _memberAnalyticsRepository.GetByCriteriaAsync(filter: filter, includes: includes, pageSize: 6, orderBy: orderBy);
        return memberAnalytics.ToDtoList().Count();
    }
}