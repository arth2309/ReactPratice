using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;

namespace peoplehawk_api.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/candidate/shortlist")]
    [ApiController]
    public class ShortlistController : BaseController
    {
        private readonly IShortlistService _shortlistService;
        private readonly IMemberAnalyticsService _memberAnalyticsService;
        public ShortlistController(IShortlistService shortlistService,IMemberAnalyticsService memberAnalyticsService) 
        {
            _shortlistService = shortlistService;
            _memberAnalyticsService = memberAnalyticsService;
        }

        [HttpPost]
        public async Task<ShortlistDto> AddShortlist(ShortlistDto shortlistDto)
        {
            return await _shortlistService.AddShortlist(shortlistDto);
        }

        [HttpDelete]
        public async Task<ShortlistDto> DeleteShortlist(int ShortlistId)
        {
            return await _shortlistService.DeleteShortlist(ShortlistId);
        }

        [HttpPut]
        public async Task<ShortlistDto> UpdateShortlistDto(ShortlistDto shortlistDto)
        {
            return await _shortlistService.UpdateShortlist(shortlistDto);
        }

        [HttpPost("user")]
        public async Task<ShortlistDto> AddUserInShortlist(ShortlistDto shortlistDto)
        {
            return await _shortlistService.AddUserinShortlist(shortlistDto);
        }

        [HttpDelete("user")]
        public async Task<ShortlistDto> RemoveUserInShortlist(int UserId, int ShortlistId)
        {
            return await _shortlistService.RemoveUserFromShortlist(UserId, ShortlistId);
        }

        [HttpGet]
        public async Task<List<Shortlist>> Shortlist()
        {
            return await _shortlistService.GetAllShortlist();
        }

        [HttpGet("user")]
        public async Task<PaginatedList<MemberAnalyticsDTO>> UserShortlist(int page = 1, int shortlist = 0)
        {
            return await _memberAnalyticsService.GetShortlistedList(page, shortlist);
        }
    }
}
