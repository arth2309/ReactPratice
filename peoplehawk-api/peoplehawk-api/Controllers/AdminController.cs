using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Implementation;
using PeoplehawkServices.Interface;

namespace peoplehawk_api.Controllers;

[Authorize(Roles = "Admin")]
[Route("api/candidate")]
[ApiController]
public class AdminController : BaseController
{
    private readonly IMemberAnalyticsService _memberAnalyticsService;
    private readonly IRequestService _requestService;
    private readonly IClientService _clientService;

    public AdminController(IMemberAnalyticsService memberAnalyticsService, IRequestService requestService, IClientService clientService)
    {
        _memberAnalyticsService = memberAnalyticsService;
        _requestService = requestService;
        _clientService = clientService;
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

    [HttpPost("client/create")]
    public async Task<int> AddClient(ClientRegisterDto clientRegisterDto)
    {
        ValidateModel();
        return await _clientService.Register(clientRegisterDto);
    }

    [HttpGet("client/{Id:int}")]
    public async Task<ClientGetDto> ViewClient(int Id)
    {
        ValidateId(Id);
        return await _clientService.GetClientDetails(Id);
    }

    [HttpGet("client/list")]
    public async Task<PaginatedList<ClientGetDto>> GetClientList(int AdminId = 1)
    {
        return await _clientService.GetClientList(AdminId);
    }

    [HttpPost("client/invitation-link")]
    public async Task ShareProfile(string email)
    {
        await _clientService.SendInvitationLink(email);
    }
    [AllowAnonymous]
    [HttpGet("client")]
    public async Task<bool> VerifyPasswordToken(string email, string token)
    {
        return await _clientService.VerifyToken(email,token);
    }

    [AllowAnonymous]
    [HttpPost("client/password")]
    public async Task<bool> GeneratePassword([FromBody]LoginDetails loginDetails)
    {
        ValidateModel();
        return await _clientService.CreatePassword(loginDetails);
    }

}
