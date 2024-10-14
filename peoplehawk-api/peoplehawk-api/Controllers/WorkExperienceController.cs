using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;

namespace peoplehawk_api.Controllers;

[Authorize(Roles = "Candidate")]
[Route("api/candidate/work-experience")]
[ApiController]
public class WorkExperienceController : BaseController
{
    private readonly IWorkExperienceService _workExperienceService;

    public WorkExperienceController(IWorkExperienceService workExperienceService)
    {
        _workExperienceService = workExperienceService;
    }

    [HttpPost]
    public async Task<ActionResult<WorkExperienceDTO>> AddWorkExperience([FromBody] WorkExperienceDTO workExperienceDTO)
    {
        ValidateModel();
        return await _workExperienceService.AddData(workExperienceDTO);
    }

    [HttpGet]
    public async Task<ActionResult<List<WorkExperienceDTO>>> WorkExperienceList(int UserId)
    {
        return await _workExperienceService.GetList(UserId);
    }

    [HttpDelete]
    public async Task<ActionResult<WorkExperienceDTO>> DeleteWorkExperience(int UserId)
    {
        return await _workExperienceService.DeleteData(UserId);
    }

    [HttpPut]
    public async Task<ActionResult<WorkExperienceDTO>> UpdateWorkExperience([FromBody] WorkExperienceDTO workExperienceDTO)
    {
        ValidateModel();
        return await _workExperienceService.UpdateData(workExperienceDTO);
    }
}
