using Microsoft.AspNetCore.Http;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;


namespace PeoplehawkServices.Interface;
public interface IResumeFileService : IGenericService<ResumeFile>
{
    Task<ResumeFileDTO> UploadFile(IFormFile file, int UserId);

    Task<(byte[], string)> GetFile(int UserId);

    Task<ResumeFileDTO> UpdateFile(IFormFile file, int UserId);

    Task<ResumeFileDTO> GetUserResume(int UserId);
}
