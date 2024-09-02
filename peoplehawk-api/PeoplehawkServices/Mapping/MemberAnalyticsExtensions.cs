using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Mapping;
public static class MemberAnalyticsExtensions
{
    public static MemberAnalyticsDTO ToDto( this MemberAnalytics memberAnalytics)
    {
        return new MemberAnalyticsDTO
        {
            UserId = memberAnalytics.UserId,
            FirstName = memberAnalytics.user.FirstName,
            LastName = memberAnalytics.user.LastName,
            Email = memberAnalytics.user.Email,
            country = memberAnalytics.user.Country,
            MemberType = memberAnalytics.user.MemberType,
            OwnedBy = memberAnalytics.OwnedBy,
            Completion = memberAnalytics.completion,
            IsResumeUpload = false,
        };
    }

    public static List<MemberAnalyticsDTO> ToDtoList(this List<MemberAnalytics> MemberAnalytics)
    {
        return MemberAnalytics.Select(quiz => quiz.ToDto()).OrderBy(a => a.UserId).ToList();
    }
}
