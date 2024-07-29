using PeoplehawkServices.Dto;
using PeoplehawkRepositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkServices.Mapping
{
    public static class ResumeFileExtensions
    {
        public static ResumeFileDTO ToDto(this ResumeFile resumeFile)
        {
            return new ResumeFileDTO
            {
                Id = resumeFile.Id,
                FileName = resumeFile.FileName,
                FilePath = resumeFile.FilePath,
                UploadDate = resumeFile.UploadDate,

            };
        }

        public static ResumeFile FromDto(this ResumeFileDTO resumeFileDTO)
        {
            return new ResumeFile
            {
               Id= resumeFileDTO.Id,
               FileName = resumeFileDTO.FileName,
               FilePath = resumeFileDTO.FilePath,
               UploadDate = resumeFileDTO.UploadDate,

            };
        }

    }
}
