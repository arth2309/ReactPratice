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
        private readonly IQuizService _quizService;
        private readonly IPersonalityReportService _personalityReportService;


        public PeoplehawkAPIController(ICourseInterestService courseInterestService, IChartService chartService, IResumeFileService resumeFileService, IUserService userService, ICountryService countryService, IQuizService quizService,IPersonalityReportService personalityReportService)
        {
            _courseInterestService = courseInterestService;
            _chartService = chartService;
            _resumeFileService = resumeFileService;
            _userService = userService;
            _countryService = countryService;
            _quizService = quizService;
            _personalityReportService = personalityReportService;


        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register([FromBody] UserDTO userDTO)
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
        public async Task<ActionResult<string>> Login([FromBody] LoginDetails loginDetails)
        {

            return await _userService.Login(loginDetails.email, loginDetails.password);
        }

        [HttpGet("{UserId:int}")]

        public async Task<ActionResult<ChartDTO>> Chart(int UserId)
        {

            return await _chartService.FirstorDefaultAsync(a => a.UserId == UserId);
        }


        [AllowAnonymous]
        [HttpGet("users")]

        public async Task<List<UserDTO>> Users()
        {
            return await _userService.GetAllAsync();
        }

        [AllowAnonymous]
        [HttpPost("forgotpassword")]

        public ActionResult<string> SendMail([FromBody] ForgotPasswordDetails forgotPasswordDetails)
        {
            return _userService.SendEmail(forgotPasswordDetails.email);
        }

        [HttpGet]

        public async Task<List<CourseInterestDTO>> CourseInterests()
        {
            return await _courseInterestService.GetAllAsync();
        }

        [HttpPost("files/{UserId:int}")]
        public async Task<ResumeFileDTO> UploadFile(IFormFile file,int UserId)
        {
            return await _resumeFileService.UploadFile(file,UserId);
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
            return await _resumeFileService.DeleteAsync(a => a.UserId == UserId);
        }

        [HttpPut("files/{UserId:int}")]
        public async Task<ResumeFileDTO> UpdateFile(IFormFile file, int UserId)
        {
            return await _resumeFileService.UpdateFile(file, UserId);
        }

        [AllowAnonymous]
        [HttpGet("country")]
        public async Task<List<CountryDTO>> Country()
        {
            return await _countryService.GetAllAsync();
        }

        [AllowAnonymous]
        [HttpGet("criteria")]

        public async Task<List<UserDTO>> UsersList()
        {
            return await _userService.UsersList(a => a.CountryId == 1);
        }

        [AllowAnonymous]
        [HttpGet("quiz")]
        
        public async Task <List<QuizDTO>> QuizList()
        {
            return await _quizService.GetAllQuiz();
        }

        [AllowAnonymous]
        [HttpPost("personalityreport")]

        public async Task <List<PersonalityReportDTO>> QuizResponse ([FromBody] List<PersonalityReportDTO> personalityReportDTOs)
        {
            var result = await _personalityReportService.AddQuizResult(personalityReportDTOs);
            return result;
        }

        [AllowAnonymous]
        [HttpGet("personalityreport/{UserId:int}")]
        public async Task<bool> QuizEligible(int UserId)
        {
            var result = await _personalityReportService.FirstorDefaultAsync(x => x.UserId == UserId );
            return result == null ? false : true;
        }

        [HttpPut("home/{UserId:int}")]
        public async Task<UserDTO> UploadProfilePhoto(IFormFile file,int UserId)
        {
            return await _userService.UpdateFile(file,UserId);
        }

        [HttpGet("home/{UserId:int}")]

        public async Task<IActionResult> GetPhoto(int UserId)
        {
            var result = await _userService.GetPhoto(UserId);
            return File(result.Item1, "application/pdf", result.Item2);
        }


        [HttpGet("home/progress/{UserId:int}")]
        public async Task<int> Progress(int UserId)
        {
            int x = 3;
            ResumeFileDTO resumeFileDTO = await _resumeFileService.FirstorDefaultAsync(a => a.UserId == UserId);
            if (resumeFileDTO != null)
            {
                x = x + 47;
            }

            PersonalityReportDTO personalityReportDTO = await _personalityReportService.FirstorDefaultAsync(a => a.UserId == UserId);

            if (personalityReportDTO != null) 
            {
                x = x + 50;
            }

            return x;

        }


    }
}
