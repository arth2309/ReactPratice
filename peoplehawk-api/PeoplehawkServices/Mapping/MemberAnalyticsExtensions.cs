using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Mapping;
public static class MemberAnalyticsExtensions
{
    public static MemberAnalyticsDTO ToDto( this MemberAnalytics memberAnalytics)
    {

        string? base64String;


        if (memberAnalytics.user.ProfilePhoto != null)
        {
            string uploadsFolder = Path.Combine("Files");
            string filePath = Path.Combine(uploadsFolder, memberAnalytics.user.ProfilePhoto);
            var fileBytes = File.ReadAllBytes(filePath);
            base64String = Convert.ToBase64String(fileBytes);
        }

        else
        {
            base64String = null;
        }
      

        return new MemberAnalyticsDTO
        {


            UserId = memberAnalytics.UserId,
            FirstName = memberAnalytics.user.FirstName,
            LastName = memberAnalytics.user.LastName,
            Email = memberAnalytics.user.Email,
            IsProfilePhoto = memberAnalytics.user.ProfilePhoto == null ? false : true,
            country = memberAnalytics.user.Country,
            MemberType = memberAnalytics.user.MemberType,
            PhotoContent = base64String,
            OwnedBy = memberAnalytics.OwnedBy,
            Completion = memberAnalytics.completion,
            IsResumeUpload = false,
        };
    }

    public static List<MemberAnalyticsDTO> ToDtoList(this List<MemberAnalytics> MemberAnalytics)
    {
        return MemberAnalytics.Select(quiz => quiz.ToDto()).ToList();
    }
}
