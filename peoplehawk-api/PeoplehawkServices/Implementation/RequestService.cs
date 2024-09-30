using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Mapping;
using PeoplehawkServices.Interface;

namespace PeoplehawkServices.Implementation;
public class RequestService : GenericService<Request>, IRequestService
{
    private readonly IRequestRepository _requestRepository;

    public RequestService(IRequestRepository requestRepository) : base(requestRepository)
    {
        _requestRepository = requestRepository;
    }

    public async Task<RequestDTO> UpsertRequest(RequestDTO requestDTO)
    {
        if (requestDTO.Id > 0)
        {
            var model = await _requestRepository.UpdateAsync(requestDTO.FromDto());
            return model.ToDto();
        }

        else
        {
            var model = await _requestRepository.AddAsync(requestDTO.FromDto());
            return model.ToDto();
        }
    }

    public async Task<RequestDTO> GetRequest(int UserId)
    {
        var entity = await _requestRepository.FirstOrDefaultAsync(x => x.UserId == UserId);
        return entity.ToDto();
    }
}
