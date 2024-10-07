using Microsoft.AspNetCore.Mvc;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;

namespace peoplehawk_api.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController : BaseController
{

    private readonly IUserService _userService;
    private readonly ICountryService _countryService;

    public AuthController(IUserService userService, ICountryService countryService) 
    {
        _userService = userService;
        _countryService = countryService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDTO>> Register([FromBody] UserDTO userDTO)
    {
        ValidateModel();
        return  await _userService.Register(userDTO);
    }

    [HttpPost]
    public async Task<ActionResult<string>> Login([FromBody] LoginDetails loginDetails)
    {
        ValidateModel();
        return  await _userService.Login(loginDetails);
    }



    [HttpGet("country")]
    public async Task<List<CountryDTO>> Country()
    {
        return await _countryService.GetCountryList();
    }

    [HttpGet("criteria")]
    public async Task<List<User>> UsersList()
    {
        return await _userService.GetUserByCriteria(filter : a=>a.CountryId == 1,page : 1, pageSize : 3, orderBy:a=> a.OrderBy(a=> a.Id),includes : x => x.Role );
    }
}
