using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Interface;
public interface IUserCompentencyDetailService : IGenericService<UserCompentencyDetail>
{
    Task<List<UserCompentencyDetailDTO>> GetList();
}
