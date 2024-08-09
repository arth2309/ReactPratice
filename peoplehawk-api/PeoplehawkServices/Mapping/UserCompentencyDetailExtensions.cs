using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;


namespace PeoplehawkServices.Mapping
{
    public static class UserCompentencyDetailExtensions
    {
        public static UserCompentencyDetailDTO ToDto(this UserCompentencyDetail UserCompentencyDetail)
        {
            return new UserCompentencyDetailDTO
            {
               Id = UserCompentencyDetail.Id,
               Name = UserCompentencyDetail.user.FirstName + " " + UserCompentencyDetail.user.LastName,
               Compentencies = UserCompentencyDetail.Compentencies
            };
        }

        
        public static List<UserCompentencyDetailDTO> ToDtoList(this List<UserCompentencyDetail> userCompentencyDetails)
        {
            return userCompentencyDetails.Select(quiz => quiz.ToDto()).OrderBy(a => a.Id).ToList();
        }
    }
}
