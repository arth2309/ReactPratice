using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;

namespace peoplehawk_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeoplehawkAPIController : ControllerBase
    {
        private readonly ICourseInterestService _courseInterestService;
        private readonly IChartService _chartService;
        private readonly IResumeFileService _resumeFileService;
        private readonly IUserService _userService;
       

        public PeoplehawkAPIController(ICourseInterestService courseInterestService,IChartService chartService,IResumeFileService resumeFileService,IUserService userService)    
        {
           _courseInterestService = courseInterestService;
           _chartService = chartService;
           _resumeFileService = resumeFileService;
            _userService = userService;
           
        }

        [HttpPost("Auth/{email}&&{password}")]
        public async Task<ActionResult<string>> Login(string email,string password)
        {
            try
            {
                
                return await _userService.Login(email, password);
               
            }

            catch (KeyNotFoundException) 
            {
                return NotFound("Invalid Login credintials");
            }
        }

        [HttpGet("{UserId:int}")]
       
        public async Task<ActionResult<ChartDTO>> Chart(int UserId)
        {
            
            return await _chartService.FirstorDefaultAsync(a=>a.UserId == UserId);
        }

        [HttpGet]
        [Authorize]
        public async  Task<List<CourseInterestDTO>> CourseInterests()
        {
            return await _courseInterestService.GetAllAsync();
        }

        [HttpPost("Files")]
        public async Task<ResumeFileDTO> UploadFile(IFormFile file)
        {
            return await _resumeFileService.UploadFile(file);
        }

        [HttpGet("Files/{UserId:int}")]
     
        public async Task<IActionResult> GetFile(int UserId)
        {
            try
            {
                var result = await _resumeFileService.GetFile(UserId);
                return File(result.Item1, "application/pdf", result.Item2);
            }

            catch (KeyNotFoundException)
            {
                return NotFound("User Does not Exist");
            }

        }

        [HttpDelete("Files/{UserId:int}")]
        public async Task<ResumeFileDTO> DeleteFile(int UserId)
        { 
           return await _resumeFileService.DeleteAsync(a=>a.UserId == UserId); 
        }

        [HttpPut("Files/{UserId:int}")]
        public async Task<ResumeFileDTO> UpdateFile(IFormFile file, int UserId)
        { 
            return  await _resumeFileService.UpdateFile(file, UserId); 
        }

    }
}
