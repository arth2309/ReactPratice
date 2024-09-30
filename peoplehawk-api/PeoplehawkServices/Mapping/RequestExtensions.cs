using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Mapping;
public static class RequestExtensions
{
    public static RequestDTO ToDto(this Request request)
    {
        if (request == null)
        {
            return null;
        }
        return new RequestDTO(request.Id, request.UserId, request.IsPersonalityTestRequest, request.IsResumeUploadRequest);
    }

    public static Request FromDto(this RequestDTO requestDTO)
    {
        return new Request
        {
            Id = requestDTO.Id,
            UserId = requestDTO.UserId,
            IsResumeUploadRequest = requestDTO.IsResumeUploadRequest,
            IsPersonalityTestRequest = requestDTO.IsPersonalityTestRequest
        };
    }
}
