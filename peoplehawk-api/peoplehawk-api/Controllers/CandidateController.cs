using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;

namespace peoplehawk_api.Controllers;

[Authorize(Roles = "Candidate")]
[Route("api/candidate")]
[ApiController]
public class CandidateController : BaseController
{
    private readonly ICourseInterestService _courseInterestService;
    private readonly IChartService _chartService;
    private readonly IUserService _userService;
    private readonly IQuizService _quizService;
    private readonly IPersonalityReportService _personalityReportService;
    private readonly ICompentencyService _compentencyService;
    private readonly IUserCompentencyDetailService _userCompentencyDetailService;
    private readonly ITextNoteService _textNoteService;
    private readonly IAudioNoteService _audioNoteService;
    private readonly ICompletionService _completionService;
    private readonly IShareProfileTokenService _shareProfileTokenService;

    public CandidateController(ICourseInterestService courseInterestService, IChartService chartService, IUserService userService, IQuizService quizService, IPersonalityReportService personalityReportService,ICompentencyService compentencyService, IUserCompentencyDetailService userCompentencyDetailService,IAudioNoteService audioNoteService,ITextNoteService textNoteService,ICompletionService completionService,IShareProfileTokenService shareProfileTokenService)
    {
        _courseInterestService = courseInterestService;
        _chartService = chartService;
        _userService = userService;
        _quizService = quizService;
        _personalityReportService = personalityReportService;
        _compentencyService = compentencyService;
        _userCompentencyDetailService = userCompentencyDetailService;
        _textNoteService = textNoteService;
        _audioNoteService = audioNoteService;
        _completionService = completionService;
        _shareProfileTokenService = shareProfileTokenService;
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
        ValidateId(UserId);
        return await _personalityReportService.GetReport(UserId);
    }

    [HttpPut("{UserId:int}/uploadPhoto")]
    public async Task<ActionResult<UserDTO>> UploadProfilePhoto(IFormFile file, int UserId)
    {
        ValidateId(UserId);
        return file != null ? await _userService.UpdateFile(file, UserId) : BadRequest();
    }

    [HttpGet("{UserId:int}/candidatePhoto")]
    public async Task<IActionResult> ProfilePhoto(int UserId)
    {
        ValidateId(UserId);
        var result = await _userService.GetPhoto(UserId);
        return  File(result.Item1, "application/pdf", result.Item2) ;
    }

    [AllowAnonymous]
    [HttpGet("{UserId:int}/candidateDetail")]
     public async Task<UserDetailDTO> UserDetail(int UserId)
    {
        ValidateId(UserId);
        return await _userService.GetDetail(UserId);
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

    
    [HttpPost("audio-note")]
    public async Task<AudioNoteDTO> AudioNote([FromForm] AudioNotePostDto audioNotePostDto)
    {
        ValidateModel();
        return await _audioNoteService.AddNote(audioNotePostDto);   
    }

    [HttpDelete("audio-note")]
    public async Task<AudioNoteDTO> DeleteAudioNote(int Id)
    {
        return await _audioNoteService.DeleteNote(Id);
    }

    [HttpPost("text-note")]
    public async Task<TextNoteDto> TextNote([FromBody]TextNoteDto textNoteDto)
    {
        return await _textNoteService.AddNote(textNoteDto);
    }

    [HttpDelete("text-note")]
    public async Task<TextNoteDto> DeleteTextNote(int Id)
    {
        return await _textNoteService.DeleteNote(Id);
    }

    [HttpPost("about-me")]
    public async Task<AboutMeDetailDTO> AddAboutMe([FromBody] AboutMeDetailDTO aboutMeDetailDTO)
    {
        return await _userService.AddAboutMe(aboutMeDetailDTO);
    }

    [HttpPost("manage-note")]
    public async Task<bool> Note(int UserId,bool isNote)
    {
        return await _completionService.ManageNotes(UserId, isNote);
    }

    [HttpPost("share-profile")]
    public async Task ShareProfile(ShareProfileTokenPostDto shareProfileTokenPostDto)
    {
        await _shareProfileTokenService.SendEmailAsync(shareProfileTokenPostDto);
    }

    [AllowAnonymous]
    [HttpGet("verify-token")]
    public async Task<UserDetailDTO> VerifyToken(string token)
    {
       return await _shareProfileTokenService.VerifyToken(token);
    }

    [HttpGet("profile-link-list")]
    public async Task<List<ShareProfileTokenGetDto>> ProfileLinkList(int UserId)
    {
        return await _shareProfileTokenService.Getlist(UserId);
    }

    [HttpDelete("share-profile")]
    public async Task<ShareProfileTokenGetDto> DeleteProfileLink(int Id)
    {
        return await _shareProfileTokenService.DeleteItem(Id);
    }
}