using Microsoft.EntityFrameworkCore;
using PeoplehawkRepositories.Implementation;
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
    private readonly IUserRepository _userRepository;
    private readonly ICandidateClientRepository _candidateClientRepository;
    private readonly ICandidateRepository _candidateRepository;
    private readonly IClientRepository _clientRepository;

    public MemberAnalyticsService(IMemberAnalyticsRepository memberAnalyticsRepository, IUserShortlistRepository userShortlistRepository, IShortlistRepository shortlistRepository, IUserRepository userRepository, ICandidateClientRepository candidateClientRepository,ICandidateRepository candidateRepository, IClientRepository clientRepository) : base(memberAnalyticsRepository)
    {
        _memberAnalyticsRepository = memberAnalyticsRepository;
        _userShortlistRepository = userShortlistRepository;
        _shortlistRepository = shortlistRepository;
        _userRepository = userRepository;
        _candidateClientRepository = candidateClientRepository;
        _candidateRepository = candidateRepository;
        _clientRepository = clientRepository;
    }


    public async Task<PaginatedList<MemberAnalyticsDTO>> GetList(
       int page,
       int userId,
       int typeId,
         bool isResume = false,
         bool isPersonalityTest = false,
      string sortOrder = "asc", int orderedBy = 0,
       bool isProfilePhoto = false, string? searchTerm = null, int? countryId = 0, string? memberType = null,int? clientId = 0)
    {

        User user = await _userRepository.GetByIdAsync(userId);

        IEnumerable<int>? userIds = null;

        bool isAllowed = false;

        if (user.RoleId == 3)
        {

            Client client = await _clientRepository.GetByIdAsync(typeId);
            isAllowed = client.isAllowed;
            userIds = isAllowed ? await _candidateClientRepository.GetIsAllowedUserIdsByClientIdAsync(typeId) : await _candidateClientRepository.GetUserIdsByClientIdAsync(typeId);
        }


        var includes = new Expression<Func<MemberAnalytics, object>>[] { x => x.user, x => x.user.Country, x => x.OwnedBy, x => x.completion};
        Expression<Func<MemberAnalytics, bool>> filter = a =>
         (user.RoleId == 2 || userIds == null && !userIds.Any() || (isAllowed ? !userIds.Contains(a.user.Id) : userIds.Contains(a.user.Id))) &&
        (countryId == 0 || a.user.CountryId == countryId) &&
        (searchTerm == null || a.user.FirstName.ToLower().Contains(searchTerm.ToLower())) &&
        (memberType == null || a.user.MemberType == memberType) &&
        (!isProfilePhoto || a.user.ProfilePhoto != null) &&
        (!isResume || a.completion.IsCVUploaded) &&
        (!isPersonalityTest || a.completion.IsPersonalityQuizGiven) &&
        (user.RoleId == 3 || clientId == 0 || a.ClientId == clientId);
   
    
       

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

        PaginatedList<MemberAnalytics> memberAnalytics = await _memberAnalyticsRepository.GetByPaginatedCriteriaAsync(filter: filter, page: page, includes: includes, pageSize: 6, orderBy: orderBy);
        PaginatedList<MemberAnalyticsDTO> memberAnalyticsDTOs = new()
        {
            TotalCount = memberAnalytics.TotalCount,
            Page = memberAnalytics.Page,
            PageSize = memberAnalytics.PageSize,
            items = new List<MemberAnalyticsDTO>()
        };

        foreach (var member in memberAnalytics.items)
        {
            MemberAnalyticsDTO dto = member.ToDto();
            var userShortlist = await _userShortlistRepository.GetByCriteriaAsync(filter: x => x.UserId == member.UserId && x.Shortlists.CreatedBy == userId, includes: x => x.Shortlists);
            dto.Shortlist = userShortlist.Select(x => x.Shortlists).ToList();
            dto.Owned_By = await GetOwnedByAsync(member.UserId);
            dto.isAllowed = user.RoleId == 2 ? true : isAllowed ? true : typeId == member.ClientId ? true : false;
            memberAnalyticsDTOs.items.Add(dto);
        }

        return memberAnalyticsDTOs;
    }

    public async Task<PaginatedList<MemberAnalyticsDTO>> GetShortlistedList(int page, int shortlistId,int userId,int typeId)
    {
        User user = await _userRepository.GetByIdAsync(userId);

        bool isAllowed = false;

        if (user.RoleId == 3)
        {

            Client client = await _clientRepository.GetByIdAsync(typeId);
            isAllowed = client.isAllowed;
           
        }

        var includes = new Expression<Func<MemberAnalytics, object>>[] { x => x.user, x => x.user.Country, x => x.OwnedBy, x => x.completion, x=>x.client};
        var list = await _userShortlistRepository.GetByCriteriaAsync(filter : x => x.ShortlistId == shortlistId);
        var userIds = list.Select(s => s.UserId).ToList();
        PaginatedList<MemberAnalytics> memberAnalytics = await _memberAnalyticsRepository.GetByPaginatedCriteriaAsync(filter: x => userIds.Contains(x.UserId), page: page, includes: includes, pageSize: 6);
        PaginatedList<MemberAnalyticsDTO> memberAnalyticsDTOs = new()
        {
            TotalCount = memberAnalytics.TotalCount,
            Page = memberAnalytics.Page,
            PageSize = memberAnalytics.PageSize,
            items = new List<MemberAnalyticsDTO>()
        };

        foreach (var member in memberAnalytics.items)
        {
            MemberAnalyticsDTO dto = member.ToDto();
            var userShortlist = await _userShortlistRepository.GetByCriteriaAsync(filter: x => x.UserId == member.UserId, includes: x => x.Shortlists);
            dto.Shortlist = userShortlist.Select(x => x.Shortlists).ToList();
            dto.Owned_By = await GetOwnedByAsync(member.UserId);
            dto.isAllowed = user.RoleId == 2 ? true :  isAllowed ? true : typeId == member.ClientId ? true : false;
            memberAnalyticsDTOs.items.Add(dto);
        }

        return memberAnalyticsDTOs;
    }

    public async Task<string> GetOwnedByAsync(int userId)
    {
        var candidate = await _candidateRepository.FirstOrDefaultAsync(x => x.UserId == userId);
        if (candidate == null)
            return "peoplehawk";

        var candidateClient = await _candidateClientRepository.FirstOrDefaultAsync(cc => cc.CandidateId == candidate.Id);

        if (candidateClient == null)
            return "peoplehawk";

        var client = await _clientRepository.FirstOrDefaultAsync(c => c.Id == candidateClient.ClientId);

        if (client == null)
            return "peoplehawk";

        var user = await _userRepository.FirstOrDefaultAsync(u => u.Id == client.UserId);

        if (user == null)
            return "peoplehawk";

        return $"{user.FirstName} {user.LastName}";
    }
}