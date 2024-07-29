using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;

namespace peoplehawk_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PeoplehawkAPIController : ControllerBase
    {
        private readonly ICourseInterestService _courseInterestService;
        private readonly IChartService _chartService;
        private readonly IResumeFileService _resumeFileService;
        private readonly IUserService _userService;
        private readonly ICountryService _countryService;
      

        public PeoplehawkAPIController(ICourseInterestService courseInterestService,IChartService chartService,IResumeFileService resumeFileService,IUserService userService,ICountryService countryService)    
        {
           _courseInterestService = courseInterestService;
           _chartService = chartService;
           _resumeFileService = resumeFileService;
            _userService = userService;
            _countryService = countryService;
            
           
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register([FromBody]UserDTO userDTO)
        {
            try
            {
                return await _userService.Register(userDTO);
            }

            catch (Exception ex) 
            {
                return NotFound(ex);            
            }
        }

        [AllowAnonymous]
        [HttpPost("auth")]
        public async Task<ActionResult<string>> Login([FromBody]  LoginDetails loginDetails)
        {

                return await _userService.Login(loginDetails.email, loginDetails.password);
        }

        [HttpGet("{UserId:int}")]
       
        public async Task<ActionResult<ChartDTO>> Chart(int UserId)
        {

            return await _chartService.FirstorDefaultAsync(a=>a.UserId == UserId);
        }


        [AllowAnonymous]
        [HttpGet("users")]

        public async Task<List<UserDTO>> Users()
        {
            return await _userService.GetAllAsync();
        }

        [HttpGet]
    
        public async  Task<List<CourseInterestDTO>> CourseInterests()
        {
            return await _courseInterestService.GetAllAsync();
        }

        [HttpPost("files")]
        public async Task<ResumeFileDTO> UploadFile(IFormFile file)
        {
            return await _resumeFileService.UploadFile(file);
        }

        [HttpGet("files/{UserId:int}")]
     
        public async Task<IActionResult> GetFile(int UserId)
        {
                var result = await _resumeFileService.GetFile(UserId);
                return File(result.Item1, "application/pdf", result.Item2);
        }

        [HttpDelete("files/{UserId:int}")]
        public async Task<ResumeFileDTO> DeleteFile(int UserId)
        { 
           return await _resumeFileService.DeleteAsync(a=>a.UserId == UserId); 
        }

        [HttpPut("files/{UserId:int}")]
        public async Task<ResumeFileDTO> UpdateFile(IFormFile file, int UserId)
        { 
            return  await _resumeFileService.UpdateFile(file, UserId); 
        }

        [AllowAnonymous]
        [HttpGet("country")]
        public async Task<List<CountryDTO>> Country()
        {
            return await _countryService.GetAllAsync();
        }

    }
}
