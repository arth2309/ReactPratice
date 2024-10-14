using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;

namespace peoplehawk_api.Controllers;

[Authorize(Roles = "Candidate")]
[Route("api/candidate/assignment")]
[ApiController]
public class AssignmentController : BaseController
{
    private readonly IAssignmentService _assignmentService;
    public AssignmentController(IAssignmentService assignmentService)
    {
        _assignmentService = assignmentService;
    }
    [HttpPost]
    public async Task<ActionResult<AssignmentDTO>> AddAssignment([FromBody] AssignmentDTO assignmentDTO)
    {
        ValidateModel();
        return await _assignmentService.AddData(assignmentDTO);
    }

    [HttpGet]
    public async Task<ActionResult<List<AssignmentDTO>>> AssignmentList(int UserId)
    {
        return await _assignmentService.GetList(UserId);
    }

    [HttpDelete]
    public async Task<ActionResult<AssignmentDTO>> DeleteAssignment(int UserId)
    {
        return await _assignmentService.DeleteData(UserId);
    }

    [HttpPut]
    public async Task<ActionResult<AssignmentDTO>> UpdateAssignment([FromBody] AssignmentDTO assignmentDTO)
    {
        ValidateModel();
        return await _assignmentService.UpdateData(assignmentDTO);
    }
}