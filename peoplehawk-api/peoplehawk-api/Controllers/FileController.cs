using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;

namespace peoplehawk_api.Controllers;

[Authorize(Roles = "Candidate")]
[Route("api/candidate/files")]
[ApiController]
public class FileController : BaseController
{
    private readonly IResumeFileService _resumeFileService;

    public FileController(IResumeFileService resumeFileService)
    {
        _resumeFileService = resumeFileService;
    }

    [HttpPost("{UserId:int}")]
    public async Task<ResumeFileDTO> UploadFile(IFormFile file, int UserId)
    {
        ValidateId(UserId);
        return await _resumeFileService.UploadFile(file, UserId);
    }

    [HttpGet("{UserId:int}")]
    public async Task<IActionResult> GetFile(int UserId)
    {
        ValidateId(UserId);
        var result = await _resumeFileService.GetFile(UserId);
        return File(result.Item1, "application/pdf", result.Item2);
    }

    [HttpDelete("{UserId:int}")]
    public async Task<ResumeFileDTO> DeleteFile(int UserId)
    {
        ValidateId(UserId);
        return await _resumeFileService.DeleteFile(UserId);
    }

    [HttpPut("{UserId:int}")]
    public async Task<ActionResult<ResumeFileDTO>> UpdateFile(IFormFile file, int UserId)
    {
        ValidateId(UserId);
        return file != null ? await _resumeFileService.UpdateFile(file, UserId) : BadRequest();
    }

}
