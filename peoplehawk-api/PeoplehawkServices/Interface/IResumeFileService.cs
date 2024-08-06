using Microsoft.AspNetCore.Http;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkServices.Interface
{
    public interface IResumeFileService : IGenericService<ResumeFile,ResumeFileDTO>
    {
        Task<ResumeFileDTO> UploadFile(IFormFile file, int UserId);

        Task<(byte[], string)> GetFile(int UserId);

        Task<ResumeFileDTO> UpdateFile(IFormFile file, int UserId);
    }
}
