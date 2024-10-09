using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using PeoplehawkServices.Mapping;

namespace PeoplehawkServices.Implementation
{
    public class ShareProfileTokenService : GenericService<ShareProfileToken>,IShareProfileTokenService
    {
        private readonly IShareProfileTokenRepository _shareProfileRepository;
     
        public ShareProfileTokenService(IShareProfileTokenRepository shareProfileRepository) : base(shareProfileRepository)
        {
            _shareProfileRepository = shareProfileRepository;
      
        }

        public async Task<ShareProfileToken> AddToken(ShareProfileTokenPostDto shareProfileTokenPostDto)
        {
            var entity = await AddAsync(shareProfileTokenPostDto.FromDto());
            return entity;
        }

        //public async Task<UserDetailDTO> VerifyToken(string token)
        //{
        //    var entity = await FirstorDefaultAsync(x => x.Token == token);
        //    if(entity == null) 
        //    {
        //        throw new ArgumentNullException("token is not valid");
        //    }

        //    if(entity.ExpirationDate < DateTime.Now) 
        //    {
        //        throw new ArithmeticException("token is expire");
        //    }

        //    return await _userService.GetDetail(entity.UserId);
        //}
    }
}