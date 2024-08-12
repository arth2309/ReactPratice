using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using PeoplehawkServices.Mapping;

namespace PeoplehawkServices.Implementation
{
    public class UserCompentencyDetailService : GenericService<UserCompentencyDetail>,IUserCompentencyDetailService
    {
        private readonly IUserCompentencyDetailRepository _userCompentencyDetailRepository;

        public UserCompentencyDetailService(IUserCompentencyDetailRepository userCompentencyDetailRepository) : base(userCompentencyDetailRepository) 
        {
            _userCompentencyDetailRepository = userCompentencyDetailRepository;
        } 
        
        public async Task<List<UserCompentencyDetailDTO>> GetList()
        {
            List<UserCompentencyDetail> userCompentencyDetails =  await _userCompentencyDetailRepository.GetAllWithIncludesAsync(a => a.user);
            return userCompentencyDetails.ToDtoList();
        }
    }
}
