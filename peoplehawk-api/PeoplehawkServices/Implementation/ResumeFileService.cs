using AutoMapper;
using Microsoft.AspNetCore.Http;
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using PeoplehawkServices.Mapping;
using System.IO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace PeoplehawkServices.Implementation
{
    public class ResumeFileService : GenericService<ResumeFile,ResumeFileDTO>,IResumeFileService
    {
        private readonly IResumeFileRepository _resumeFileRepository;
        private readonly IMapper _mapper;
        public ResumeFileService(IResumeFileRepository resumeFileRepository, IMapper mapper) : base(resumeFileRepository, mapper) 
        {
            _resumeFileRepository = resumeFileRepository;
            _mapper = mapper;
        }

        

        public async Task<ResumeFileDTO> UploadFile(IFormFile file,int UserId)
        {
            string uploadsFolder = Path.Combine("Files");
            string filePath = Path.Combine(uploadsFolder, file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            ResumeFile resumeFile = new ResumeFile
            {
                FileName = file.FileName,
                FilePath = Path.Combine("/Files", file.FileName),
                UserId = UserId,
                UploadDate = DateTime.Now
            };

            var Resume = await _resumeFileRepository.AddAsync(resumeFile);
            return  resumeFile.ToDto();
            
        }

        public async Task<(byte[],string)> GetFile(int UserId)
        {
            ResumeFile resumeFile = await _resumeFileRepository.FirstOrDefaultAsync(x => x.UserId == UserId);
            if(resumeFile == null)
            {
                throw new KeyNotFoundException();
            }
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Files", resumeFile.FileName);
            var fileBytes = File.ReadAllBytes(filePath);
            return (fileBytes, resumeFile.FileName);
        }

        public async Task<ResumeFileDTO> UpdateFile(IFormFile file, int UserId)
        {
            ResumeFile resumeFile = await _resumeFileRepository.FirstOrDefaultAsync(x => x.UserId == UserId);

            string uploadsFolder = Path.Combine("Files");
            string filePath = Path.Combine(uploadsFolder, file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            resumeFile.FileName = file.FileName;
            resumeFile.FilePath = Path.Combine("/Files", file.FileName);

            var resume = await _resumeFileRepository.UpdateAsync(resumeFile);
            return resumeFile.ToDto();
          
        }
    }
}
