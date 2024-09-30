using PeoplehawkServices.Dto;
namespace PeoplehawkServices.Interface;

public interface IRequestService
{
    Task<RequestDTO> UpsertRequest(RequestDTO requestDTO);
    Task<RequestDTO> GetRequest(int UserId);
}
