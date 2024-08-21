using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;

namespace peoplehawk_api.Controllers;

[Authorize]
[Route("api/candidate")]
[ApiController]
public class CandidateController : BaseController
{
    private readonly ICourseInterestService _courseInterestService;
    private readonly IChartService _chartService;
    private readonly IResumeFileService _resumeFileService;
    private readonly IUserService _userService;
    private readonly IQuizService _quizService;
    private readonly IPersonalityReportService _personalityReportService;
    private readonly ICompentencyService _compentencyService;
    private readonly IUserCompentencyDetailService _userCompentencyDetailService;

    public CandidateController(ICourseInterestService courseInterestService, IChartService chartService, IResumeFileService resumeFileService, IUserService userService, IQuizService quizService, IPersonalityReportService personalityReportService,ICompentencyService compentencyService, IUserCompentencyDetailService userCompentencyDetailService)
    {
        _courseInterestService = courseInterestService;
        _chartService = chartService;
        _resumeFileService = resumeFileService;
        _userService = userService;
        _quizService = quizService;
        _personalityReportService = personalityReportService;
        _compentencyService = compentencyService;
        _userCompentencyDetailService = userCompentencyDetailService;
    }

    [HttpGet("{UserId:int}/chart")]
    public async Task<ActionResult<ChartDTO>> Chart(int UserId)
    {
        return await _chartService.GetChartdata(UserId);
    }

    [HttpGet("courseInterests")]
    public async Task<List<CourseInterestDTO>> CourseInterests()
    {
        return await _courseInterestService.GetCourseInterestLists();
    }

    [HttpPost("files/{UserId:int}")]
    public async Task<ResumeFileDTO> UploadFile(IFormFile file, int UserId)
    {
        return await _resumeFileService.UploadFile(file, UserId);
    }

    [HttpGet("files/{UserId:int}")]
    public async Task<IActionResult> GetFile(int UserId)
    {
        var result = await _resumeFileService.GetFile(UserId);
        return File(result.Item1, "application/pdf", result.Item2);
    }

    [HttpDelete("files/{UserId:int}")]
    public async Task<ResumeFile> DeleteFile(int UserId)
    {
        return await _resumeFileService.DeleteAsync(a => a.UserId == UserId);
    }

    [HttpPut("files/{UserId:int}")]
    public async Task<ActionResult<ResumeFileDTO>> UpdateFile(IFormFile file, int UserId)
    {
        return file != null && UserId > 0 ? await _resumeFileService.UpdateFile(file, UserId) : BadRequest();
    }

    [HttpGet("quiz")]
    public async Task<List<QuizDTO>> QuizList()
    {
        return await _quizService.GetAllQuiz();
    }

    [HttpPost("personalityreport")]
    public async Task<ActionResult<List<PersonalityReportDTO>>> QuizResponse([FromBody] List<PersonalityReportDTO> personalityReportDTOs)
    {
        var result = await _personalityReportService.AddQuizResult(personalityReportDTOs);
        return ModelState.IsValid ? result : BadRequest();
    }

    [HttpGet("personalityreport/{UserId:int}")]
    public async Task<QuizStatus> QuizEligible(int UserId)
    {
        return await _personalityReportService.GetReport(UserId);
    }

    [HttpPut("{UserId:int}/uploadPhoto")]
    public async Task<ActionResult<UserDTO>> UploadProfilePhoto(IFormFile file, int UserId)
    {
        return file != null && UserId > 0 ? await _userService.UpdateFile(file, UserId) : BadRequest();
    }

    [HttpGet("{UserId:int}/candidatePhoto")]
    public async Task<IActionResult> ProfilePhoto(int UserId)
    {
        var result = await _userService.GetPhoto(UserId);
        return  File(result.Item1, "application/pdf", result.Item2) ;
    }

    [HttpGet("{UserId:int}/progress")]
    public async Task<ProgressDTO> Progress(int UserId)
    {
        ProgressDTO progressDTO = new ProgressDTO();
        int x = 0;
        ResumeFileDTO resumeFileDTO = await _resumeFileService.GetUserResume(UserId);
        if (resumeFileDTO != null)
        {
            x = x + 50;
        }

        QuizStatus quizStatus = await _personalityReportService.GetReport(UserId);

        if (quizStatus.IsFirstTestGiven == true)
        {
            x = x + 50;
        }

        progressDTO.isResumeUpload = resumeFileDTO != null ? true : false;
        progressDTO.Progress = x;
        return progressDTO;
    }

    [HttpGet("compentencies")]
    public async Task<ActionResult<List<CompetencyDTO>>> Compentencies()
    {
        return await _compentencyService.GetList();
    }

    [HttpGet("user-compentencies")]
    public async Task<ActionResult<List<UserCompentencyDetailDTO>>> UserCompentencies()
    {
        return await _userCompentencyDetailService.GetList();
    }
}