using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;

namespace peoplehawk_api.Controllers;

[Authorize(Roles = "Candidate")]
[Route("api/candidate/education-detail")]
[ApiController]
public class EducationDetailController : BaseController
{
    private readonly IEducationDetailService _educationDetailService;

    public EducationDetailController(IEducationDetailService educationDetailService)
    {
        _educationDetailService = educationDetailService;
    }

    [HttpPost]
    public async Task<ActionResult<List<EducationDetailDto>>> AddEducationDetail([FromBody] List<EducationDetailDto> educationDetailDtos)
    {
        ValidateModel();
        return await _educationDetailService.AddData(educationDetailDtos);
    }

    [HttpGet]
    public async Task<ActionResult<List<EducationDetailDto>>> EducationDetailList(int UserId)
    {
        return await _educationDetailService.GetList(UserId);
    }

    [HttpDelete]
    public async Task<ActionResult<EducationDetailDto>> DeleteEducationDetail(int UserId)
    {
        return await _educationDetailService.DeleteData(UserId);
    }

    [HttpPut]
    public async Task<ActionResult<EducationDetailDto>> UpdateEducationDetail([FromBody] EducationDetailDto educationDetailDto)
    {
        ValidateModel();
        return await _educationDetailService.UpdateData(educationDetailDto);
    }
}
