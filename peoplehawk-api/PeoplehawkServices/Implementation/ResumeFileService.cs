﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using PeoplehawkServices.Mapping;
using PeoplehawkServices.Common;


namespace PeoplehawkServices.Implementation;

public class ResumeFileService : GenericService<ResumeFile>, IResumeFileService
{
    private readonly IResumeFileRepository _resumeFileRepository;
    private readonly IMapper _mapper;
    private readonly ICompletionRepository _completionRepository;
    public ResumeFileService(IResumeFileRepository resumeFileRepository, IMapper mapper, ICompletionRepository completionRepository) : base(resumeFileRepository)
    {
        _resumeFileRepository = resumeFileRepository;
        _mapper = mapper;
        _completionRepository = completionRepository;
    }

    public async Task<ResumeFileDTO> UploadFile(IFormFile file, int UserId)
    {
        if (UserId <= 0)
        {
            throw new ArgumentOutOfRangeException(ErrorMessages.UserNotFound);
        }

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

        var Resume = await AddAsync(resumeFile);
        Completion completion = await _completionRepository.FirstOrDefaultAsync(x => x.UserId == UserId);   
        if (completion != null) 
        {
            completion.IsCVUploaded = true; 
            await _completionRepository.UpdateAsync(completion);
        }
        return resumeFile.ToDto();

    }

    public async Task<ResumeFileDTO> DeleteFile(int UserId)
    {
        var entity = await DeleteAsync(a => a.UserId == UserId);
        Completion completion = await _completionRepository.FirstOrDefaultAsync(x => x.UserId == UserId);
        if (completion != null)
        {
            completion.IsCVUploaded = false;
            await _completionRepository.UpdateAsync(completion);
        }
        return entity.ToDto();  
    }

    public async Task<(byte[], string)> GetFile(int UserId)
    {
        ResumeFile resumeFile = await FirstorDefaultAsync(x => x.UserId == UserId);
        if (resumeFile == null)
        {
            throw new KeyNotFoundException(ErrorMessages.ResumeNotUpload);
        }
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Files", resumeFile.FileName);
        var fileBytes = File.ReadAllBytes(filePath);

        return (fileBytes, resumeFile.FileName);
    }

    public async Task<string?> GetFileString(int UserId)
    {
        ResumeFile resumeFile = await FirstorDefaultAsync(x => x.UserId == UserId);
        if (resumeFile == null)
        {
            throw new KeyNotFoundException(ErrorMessages.ResumeNotUpload);
        }
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Files", resumeFile.FileName);
        var fileBytes = File.ReadAllBytes(filePath);

        string? base64String;
        if (filePath != null)
        {
            base64String = Convert.ToBase64String(fileBytes);
        }
        else
        {
            base64String = null;
        }
        return base64String;
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

    public async Task<ResumeFileDTO> GetUserResume(int UserId)
    {
        ResumeFile resumeFile = await FirstorDefaultAsync(x => x.UserId == UserId);
        return _mapper.Map<ResumeFileDTO>(resumeFile);
    }
}
