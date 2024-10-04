using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using PeoplehawkServices.Mapping;

namespace PeoplehawkServices.Implementation;
public class ShortlistService : GenericService<Shortlist>,IShortlistService
{
    private readonly IShortlistRepository _shortlistRepository;
    private readonly IUserShortlistRepository _userShortlistRepository;
    public ShortlistService(IShortlistRepository shortlistRepository, IUserShortlistRepository userShortlistRepository) : base(shortlistRepository)
    {
        _shortlistRepository = shortlistRepository;
        _userShortlistRepository = userShortlistRepository;
    }

    public async Task<ShortlistDto> AddUserinShortlist(ShortlistDto shortlistDto)
    {
        UserShortlist userShortlist = new UserShortlist
        {
            Id = 0,
            ShortlistId = shortlistDto.Id,
            UserId =  shortlistDto.UserId
        };

        await _userShortlistRepository.AddAsync(userShortlist);
        return shortlistDto;
    }

    public async Task<ShortlistDto>  AddShortlist(ShortlistDto shortlistDto)
    {
        var entity = await AddAsync(shortlistDto.FromDto());
        return new ShortlistDto
        {
            Id = entity.Id,
            UserId = shortlistDto.UserId,
            name = entity.Name,
        };
    }

    public async Task<ShortlistDto> RemoveUserFromShortlist(int UserId,int ShortlistId)
    {
        var entity = await _userShortlistRepository.DeleteAsync(a => a.UserId == UserId && a.ShortlistId == ShortlistId);
        return new ShortlistDto
        {
            Id = entity.Id,
            UserId = UserId,
            name = "",
        };
    }

    public async Task<ShortlistDto> DeleteShortlist(ShortlistDto shortlistDto)
    {
        List<UserShortlist> userShortlists = await _userShortlistRepository.GetByCriteriaAsync(filter: x => x.ShortlistId == shortlistDto.Id);    
        foreach(var userShortlist in userShortlists)
        {
            await _userShortlistRepository.DeleteAsync(x => x.UserId == userShortlist.UserId && x.ShortlistId == userShortlist.ShortlistId);
        }

        await DeleteAsync(x => x.Id == shortlistDto.Id);    
        return shortlistDto;
    }

    public async Task<ShortlistDto> UpdateShortlist(ShortlistDto shortlistDto)
    {
        var entity = await _shortlistRepository.UpdateAsync(shortlistDto.FromDto());
        return new ShortlistDto
        {
            Id = entity.Id,
            UserId = shortlistDto.UserId,
            name = entity.Name,
        };
    }

    public async Task<List<Shortlist>> GetAllShortlist()
    {
        return await GetAllAsync();    
    }
}
