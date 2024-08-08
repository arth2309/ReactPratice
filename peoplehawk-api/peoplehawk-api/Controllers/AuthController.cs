using Microsoft.AspNetCore.Mvc;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;

namespace peoplehawk_api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
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
            return ModelState.IsValid ? await _userService.Register(userDTO) : BadRequest();
        }

        [HttpPost]
        public async Task<ActionResult<string>> Login([FromBody] LoginDetails loginDetails)
        {
            return ModelState.IsValid ? await _userService.Login(loginDetails) : BadRequest();
        }

        [HttpPost("forgotpassword")]
        public ActionResult<string> SendMail([FromBody] ForgotPasswordDetails forgotPasswordDetails)
        {
            return _userService.SendEmail(forgotPasswordDetails.email);
        }

        [HttpGet("country")]
        public async Task<List<CountryDTO>> Country()
        {
            return await _countryService.GetCountryList();
        }

        [HttpGet("candidateslist")]
        public async Task<List<User>> Users()
        {
            return await _userService.GetAllAsync();
        }

        [HttpGet("criteria")]
        public async Task<List<UserDTO>> UsersList()
        {
            return await _userService.UsersList(a => a.CountryId == 1);
        }
    }
}
