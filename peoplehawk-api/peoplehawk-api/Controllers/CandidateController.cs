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
    private readonly IMemberAnalyticsService _memberAnalyticsService;
    private readonly IEducationDetailService _educationDetailService;
    private readonly IWorkExperienceService _workExperienceService;
    private readonly IAssignmentService _assignmentService;
    private readonly ITextNoteService _textNoteService;
    private readonly IAudioNoteService _audioNoteService;

    public CandidateController(ICourseInterestService courseInterestService, IChartService chartService, IResumeFileService resumeFileService, IUserService userService, IQuizService quizService, IPersonalityReportService personalityReportService,ICompentencyService compentencyService, IUserCompentencyDetailService userCompentencyDetailService, IMemberAnalyticsService memberAnalyticsService,IEducationDetailService educationDetailService,IAssignmentService assignmentService,IWorkExperienceService workExperienceService,IAudioNoteService audioNoteService,ITextNoteService textNoteService)
    {
        _courseInterestService = courseInterestService;
        _chartService = chartService;
        _resumeFileService = resumeFileService;
        _userService = userService;
        _quizService = quizService;
        _personalityReportService = personalityReportService;
        _compentencyService = compentencyService;
        _userCompentencyDetailService = userCompentencyDetailService;
        _memberAnalyticsService = memberAnalyticsService;
        _educationDetailService = educationDetailService;
        _assignmentService = assignmentService;
        _workExperienceService = workExperienceService;
        _textNoteService = textNoteService;
        _audioNoteService = audioNoteService;
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
        ValidateId(UserId);
        return await _resumeFileService.UploadFile(file, UserId);
    }

    [HttpGet("files/{UserId:int}")]
    public async Task<IActionResult> GetFile(int UserId)
    {
        ValidateId(UserId);
        var result = await _resumeFileService.GetFile(UserId);
        return File(result.Item1, "application/pdf", result.Item2);
    }

    [HttpDelete("files/{UserId:int}")]
    public async Task<ResumeFile> DeleteFile(int UserId)
    {
        ValidateId(UserId);
        return await _resumeFileService.DeleteAsync(a => a.UserId == UserId);
    }

    [HttpPut("files/{UserId:int}")]
    public async Task<ActionResult<ResumeFileDTO>> UpdateFile(IFormFile file, int UserId)
    {
        ValidateId(UserId);
        return file != null ? await _resumeFileService.UpdateFile(file, UserId) : BadRequest();
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

    [HttpGet("{UserId:int}/candidateDetail")]
     public async Task<UserDetailDTO> UserDetail(int UserId)
    {
        ValidateId(UserId);
        return await _userService.GetDetail(UserId);
    }

    [HttpGet("{UserId:int}/progress")]
    public async Task<ProgressDTO> Progress(int UserId)
    {
        ValidateId(UserId);
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

    [HttpGet("member-analytics")]
    public async Task<ActionResult<List<MemberAnalyticsDTO>>> MemberAnalyticsList(int page = 1, bool isInfographicResume = false,
          bool isMemberResume = false, bool isPeopleHawkResume = false,
          bool isAll = false, string sortOrder = "asc", int orderedBy = 0, bool isProfilePhoto = false, string? searchTerm = null,int?countryId  = 0, string? memberType = null)
    {
        return await _memberAnalyticsService.GetList(page,isInfographicResume,isMemberResume,isPeopleHawkResume,isAll, sortOrder,orderedBy, isProfilePhoto, searchTerm,countryId,memberType);
    }

    [HttpGet("member-analytics-count")]
    public async Task<ActionResult<int>> MemberAnalyticsCount(bool isInfographicResume = false, bool isMemberResume = false, bool isPeopleHawkResume = false, bool isAll = false, string sortOrder = "asc", int orderedBy = 0, bool isProfilePhoto = false, string? searchTerm = null, int? countryId = 0, string? memberType = null)
    {
        return await _memberAnalyticsService.GetCount(isInfographicResume, isMemberResume, isPeopleHawkResume, isAll, sortOrder, orderedBy, isProfilePhoto, searchTerm, countryId, memberType);
    }

    [HttpPost("education-detail")]
    public async Task<ActionResult<List<EducationDetailDto>>>  AddEducationDetail([FromBody] List<EducationDetailDto> educationDetailDtos)
    {
        ValidateModel();
        return await _educationDetailService.AddData(educationDetailDtos);
    }

    [HttpGet("education-detail")]
    public async Task<ActionResult<List<EducationDetailDto>>> EducationDetailList(int UserId)
    {
        return await _educationDetailService.GetList(UserId);
    }

    [HttpDelete("education-detail")]
    public async Task<ActionResult<EducationDetailDto>> DeleteEducationDetail(int UserId)
    {
        return await _educationDetailService.DeleteData(UserId);
    }

    [HttpPut("education-detail")]
    public async Task<ActionResult<EducationDetailDto>> UpdateEducationDetail([FromBody]EducationDetailDto educationDetailDto)
    {
        ValidateModel();
        return await _educationDetailService.UpdateData(educationDetailDto);
    }
    [HttpPost("assignment")]
    public async Task<ActionResult<AssignmentDTO>> AddAssignment([FromBody] AssignmentDTO assignmentDTO)
    {
        ValidateModel();
        return await _assignmentService.AddData(assignmentDTO);
    }

    [HttpGet("assignment")]
    public async Task<ActionResult<List<AssignmentDTO>>> AssignmentList(int UserId)
    {
        return await _assignmentService.GetList(UserId);
    }

    [HttpDelete("assignment")]
    public async Task<ActionResult<AssignmentDTO>> DeleteAssignment(int UserId)
    {
        return await _assignmentService.DeleteData(UserId);
    }

    [HttpPut("assignment")]
    public async Task<ActionResult<AssignmentDTO>> UpdateAssignment([FromBody] AssignmentDTO assignmentDTO)
    {
        ValidateModel();
        return await _assignmentService.UpdateData(assignmentDTO);
    }
    [HttpPost("work-experience")]
    public async Task<ActionResult<WorkExperienceDTO>> AddWorkExperience([FromBody] WorkExperienceDTO workExperienceDTO)
    {
        ValidateModel();
        return await _workExperienceService.AddData(workExperienceDTO);
    }

    [HttpGet("work-experience")]
    public async Task<ActionResult<List<WorkExperienceDTO>>> WorkExperienceList(int UserId)
    {
        return await _workExperienceService.GetList(UserId);
    }

    [HttpDelete("work-experience")]
    public async Task<ActionResult<WorkExperienceDTO>> DeleteWorkExperience(int UserId)
    {
        return await _workExperienceService.DeleteData(UserId);
    }

    [HttpPut("work-experience")]
    public async Task<ActionResult<WorkExperienceDTO>> UpdateWorkExperience([FromBody] WorkExperienceDTO workExperienceDTO)
    {
        ValidateModel();
        return await _workExperienceService.UpdateData(workExperienceDTO);
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
    public async Task<TextNoteDto> TextNote(TextNoteDto textNoteDto)
    {
        return await _textNoteService.AddNote(textNoteDto);
    }

    [HttpDelete("text-note")]
    public async Task<TextNoteDto> DeleteTextNote(int Id)
    {
        return await _textNoteService.DeleteNote(Id);
    }

    [HttpPost("about-me")]

    public async Task<UserDTO> AddAboutMe([FromBody]int UserId,string text)
    {
        return await _userService.AddAboutMe(UserId, text);
    }
}