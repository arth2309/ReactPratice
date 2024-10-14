using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;

namespace peoplehawk_api.Controllers;

[Authorize(Roles = "Admin")]
[Route("api/candidate")]
[ApiController]
public class AdminController : BaseController
{
    private readonly IMemberAnalyticsService _memberAnalyticsService;
    private readonly IRequestService _requestService;

    public AdminController(IMemberAnalyticsService memberAnalyticsService, IRequestService requestService)
    {
        _memberAnalyticsService = memberAnalyticsService;
        _requestService = requestService;
    }
    [HttpGet("member-analytics")]
    public async Task<ActionResult<PaginatedList<MemberAnalyticsDTO>>> MemberAnalyticsList(int page = 1, bool isResume = false, bool isPersonalityTest = false, string sortOrder = "asc", int orderedBy = 0, bool isProfilePhoto = false, string? searchTerm = null, int? countryId = 0, string? memberType = null)
    {
        return await _memberAnalyticsService.GetList(page, isResume, isPersonalityTest, sortOrder, orderedBy, isProfilePhoto, searchTerm, countryId, memberType);
    }

    [AllowAnonymous]
    [HttpPost("request")]
    public async Task<RequestDTO> Req([FromBody] RequestDTO requestDTO)
    {
        return await _requestService.UpsertRequest(requestDTO);
    }

}
