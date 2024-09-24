using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using PeoplehawkServices.Common;
using System.Net;
using System.Net.Mail;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Http;



namespace PeoplehawkServices.Implementation;

public class UserService : GenericService<User>,IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IResumeFileService _resumeFileService;
    private readonly IPersonalityReportService _personalityReportService;
    private readonly IEducationDetailService _educationDetailService;
    private readonly IAssignmentService _assignmentService;
    private readonly IWorkExperienceService _workExperienceService;
    private readonly ICompentencyService _compentencyService;
    private readonly IUserCompentencyDetailService _userCompentencyDetailService;
    private readonly ICourseInterestService _courseInterestService;
    private readonly IMemberAnalyticsService _memberAnalyticsService;
    private readonly IChartService _chartService;
    private readonly IQuizService _quizService;
    private readonly ITextNoteService _textNoteService;
    private readonly IAudioNoteService _audioNoteService;
    private readonly ICompletionRepository _completionRepository;
    private string secretKey;

    public UserService(IUserRepository userRepository,IMapper mapper, IConfiguration configuration,IMemberAnalyticsService memberAnalyticsService, IPersonalityReportService personalityReportService,ICompletionRepository completionRepository, IResumeFileService resumeFileService,IWorkExperienceService workExperienceService,IAssignmentService assignmentService, IEducationDetailService educationDetailService,IUserCompentencyDetailService userCompentencyDetailService,ICompentencyService compentencyService,IChartService chartService, ICourseInterestService courseInterestService,IQuizService quizService,IAudioNoteService audioNoteService,ITextNoteService textNoteService) : base(userRepository)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        secretKey = configuration.GetValue<string>("Jwt:Secret");
        _personalityReportService = personalityReportService;
        _resumeFileService = resumeFileService;
        _assignmentService = assignmentService;
        _educationDetailService = educationDetailService;
        _workExperienceService = workExperienceService;
        _compentencyService = compentencyService;
        _userCompentencyDetailService = userCompentencyDetailService;
        _courseInterestService = courseInterestService;
        _chartService = chartService;
        _quizService = quizService;
        _audioNoteService = audioNoteService;
        _textNoteService = textNoteService;
        _completionRepository  = completionRepository;  
        _memberAnalyticsService = memberAnalyticsService;

    }

    public async Task<string> Login(LoginDetails loginDetails)
    {

        User user = await FirstorDefaultAsync(a => a.Email == loginDetails.email && a.Password == HashHelper.HashedInput(loginDetails.password));

        if (user == null) 
        {
            throw new KeyNotFoundException(ErrorMessages.InValidCredentials);
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(secretKey);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, Convert.ToString(user.Id)),
                new Claim("UserData",JsonSerializer.Serialize(user))
            }),
            Expires = DateTime.Now.AddDays(1),
            SigningCredentials = new(new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public async Task<UserDTO> Register(UserDTO userDTO)
    {
        User user = await FirstorDefaultAsync(a => a.Email == userDTO.Email);
        if(user != null)
        {
            throw new BadHttpRequestException(ErrorMessages.EmailAlreadyExist);
        }
        userDTO.Password = HashHelper.HashedInput(userDTO.Password);
        var entity = await AddAsync(_mapper.Map<User>(userDTO));

        Completion completion = new Completion();
        var entity1 = await _completionRepository.AddAsync(completion);

        MemberAnalytics memberAnalytics = new MemberAnalytics();
        memberAnalytics.UserId = entity.Id;
       memberAnalytics.CompletionId = entity1.Id;
        await _memberAnalyticsService.AddAsync(memberAnalytics);
        return userDTO;
    }

    public string SendEmail(string email)
    {
        try
        {
            MailMessage mm = new MailMessage("tatva.dotnet.arthgandhi@outlook.com", email);
            mm.Subject = "Reset Password";
            string url = "https://localhost:3000/home";
            mm.Body = string.Format("Hi <p><a href=\"" + url + "\">Click here to resetpassword</a></p>");
            mm.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.office365.com";
            smtp.EnableSsl = true;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(userName: "tatva.dotnet.arthgandhi@outlook.com", password: "Liony@2002");
            smtp.Port = 587;
            smtp.Send(mm);
            return email;
        }

        catch (Exception ex) 
        {
            return ex.ToString();
        }
        
    }

    public async Task<List<UserDTO>> UsersList(Expression<Func<User, bool>> predicate)
    {
        List<User> users =  await _userRepository.GetByCriteriaAsync( filter : predicate);
        return  _mapper.Map<List<UserDTO>>(users);
    }

    public async Task<UserDTO> UpdateFile(IFormFile file, int UserId)
    {
        User user = await FirstorDefaultAsync(x => x.Id == UserId);
        string uploadsFolder = Path.Combine("Files");
        string filePath = Path.Combine(uploadsFolder, file.FileName);
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        user.ProfilePhoto = file.FileName;
        User user1 = await _userRepository.UpdateAsync(user);
        return _mapper.Map<UserDTO>(user1); 
    }

    public async Task<(byte[], string)> GetPhoto(int UserId)
    {
        User user = await FirstorDefaultAsync(x => x.Id == UserId);
        if(user == null || user.ProfilePhoto == null)
        {
            throw new KeyNotFoundException(ErrorMessages.PhotoNotFound);
        }
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Files", user.ProfilePhoto);
        var fileBytes = File.ReadAllBytes(filePath);
        return (fileBytes, user.ProfilePhoto);
    }

    public async Task<List<User>> GetUserByCriteria(Expression<Func<User, bool>>? filter = null,
        Func<IQueryable<User>?, IOrderedQueryable<User>>? orderBy = null,
        int? page = null,
        int? pageSize = null,
        params Expression<Func<User, object>>[]? includes)  
    {
        Expression<Func<User, bool>> predicate = user => user.FirstName.Contains("a") && user.LastName.Contains("g");
        return await _userRepository.GetByCriteriaAsync(filter : predicate,page : page,pageSize : pageSize,includes : includes, orderBy : orderBy);
    }

    public async Task<UserDetailDTO> GetDetail(int UserId)
    {

        UserDetailDTO userDetailDTO  = new UserDetailDTO();
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
        userDetailDTO.UserProgress = new ProgressDTO()
        {
            isResumeUpload = resumeFileDTO != null ? true : false,
            Progress = x
    };

        User user = await FirstorDefaultAsync(x => x.Id == UserId);
        string? base64String;
        if (user.ProfilePhoto != null)
        {
            string uploadsFolder = Path.Combine("Files");
            string filePath = Path.Combine(uploadsFolder, user.ProfilePhoto);
            var fileBytes = File.ReadAllBytes(filePath);
            base64String = Convert.ToBase64String(fileBytes);
        }

        else
        {
            base64String = null;
        }
        userDetailDTO.ProfilePhoto = base64String;
        userDetailDTO.competencies = await _compentencyService.GetList();
        userDetailDTO.userCompentencyDetails = await _userCompentencyDetailService.GetList();
        userDetailDTO.Educations =  await _educationDetailService.GetList(UserId) ;
        userDetailDTO.Assignments = await _assignmentService.GetList(UserId);
        userDetailDTO.WorkExperiences = await _workExperienceService.GetList(UserId);
        userDetailDTO.CourseInterestDetails = await _courseInterestService.GetCourseInterestLists();
        userDetailDTO.ChartDetail = await _chartService.GetChartdata(1);
        userDetailDTO.QuizDetail = await _personalityReportService.GetReport(UserId);
        userDetailDTO.QuizQuestion = userDetailDTO.QuizDetail.testNo < 3 ? await _quizService.GetAllQuiz() : null;
        userDetailDTO.Resume = userDetailDTO.UserProgress.isResumeUpload ? await _resumeFileService.GetFileString(UserId) : null;
        userDetailDTO.TextNoteList = await _textNoteService.GetNoteList(UserId);
        userDetailDTO.AudioNoteList = await _audioNoteService.GetNoteList(UserId);
        return userDetailDTO;
    }
}