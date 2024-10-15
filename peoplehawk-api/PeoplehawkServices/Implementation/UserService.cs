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
using System.Linq.Expressions;
using Microsoft.AspNetCore.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;

namespace PeoplehawkServices.Implementation;

public class UserService : GenericService<User>, IUserService
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
    private readonly IRequestService _requestService;
    private readonly IConfiguration _configuration;
    private string secretKey;

    public UserService(IUserRepository userRepository, IMapper mapper, IConfiguration configuration, IMemberAnalyticsService memberAnalyticsService, IPersonalityReportService personalityReportService, ICompletionRepository completionRepository, IResumeFileService resumeFileService, IWorkExperienceService workExperienceService, IAssignmentService assignmentService, IEducationDetailService educationDetailService, IUserCompentencyDetailService userCompentencyDetailService, ICompentencyService compentencyService, IChartService chartService, ICourseInterestService courseInterestService, IQuizService quizService, IAudioNoteService audioNoteService, ITextNoteService textNoteService, IRequestService requestService) : base(userRepository)
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
        _completionRepository = completionRepository;
        _memberAnalyticsService = memberAnalyticsService;
        _requestService = requestService;
        _configuration = configuration;


    }

    public async Task<string> Login(LoginDetails loginDetails)
    {

        User user = await _userRepository.FirstOrDefaultWithIncludesAsync(a => a.Email == loginDetails.email && a.Password == HashHelper.HashedInput(loginDetails.password),a => a.Role);

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
                new Claim (ClaimTypes.Role,user.Role.RoleName ?? ""),
                new Claim("UserData",JsonSerializer.Serialize(user))
            }),
            Expires = DateTime.Now.AddDays(1),
            SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public async Task<UserDTO> Register(UserDTO userDTO)
    {
        User user = await FirstorDefaultAsync(a => a.Email == userDTO.Email);
        if (user != null)
        {
            throw new BadHttpRequestException(ErrorMessages.EmailAlreadyExist);
        }
        userDTO.Password = HashHelper.HashedInput(userDTO.Password);
        var entity = await AddAsync(_mapper.Map<User>(userDTO));

        Completion completion = new Completion();
        completion.UserId = entity.Id;
        var entity1 = await _completionRepository.AddAsync(completion);

        MemberAnalytics memberAnalytics = new MemberAnalytics();
        memberAnalytics.UserId = entity.Id;
        memberAnalytics.CompletionId = entity1.Id;
        await _memberAnalyticsService.AddAsync(memberAnalytics);
        return userDTO;
    }



    public async Task<List<UserDTO>> UsersList(Expression<Func<User, bool>> predicate)
    {
        List<User> users = await _userRepository.GetByCriteriaAsync(filter: predicate);
        return _mapper.Map<List<UserDTO>>(users);
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
        if (user == null || user.ProfilePhoto == null)
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
        return await _userRepository.GetByCriteriaAsync(filter: predicate, page: page, pageSize: pageSize, includes: includes, orderBy: orderBy);
    }

    public async Task<UserDetailDTO> GetDetail(int UserId)
    {

        UserDetailDTO userDetailDTO = new();
        int x = 0;
        ResumeFileDTO resumeFileDTO = await _resumeFileService.GetUserResume(UserId);
        if (resumeFileDTO != null)
        {
            x += 50;
        }

        QuizStatus quizStatus = await _personalityReportService.GetReport(UserId);

        if (quizStatus.IsFirstTestGiven == true)
        {
            x = x + 50;
        }
        userDetailDTO.UserProgress = new ProgressDTO()
        {
            isResumeUpload = resumeFileDTO != null,
            Progress = x
        };

        User user = await _userRepository.FirstOrDefaultWithIncludesAsync(x => x.Id == UserId, a => a.Country);
        string? base64String = null;
        if (user.ProfilePhoto != null)
        {
            string uploadsFolder = Path.Combine("Files");
            string filePath = Path.Combine(uploadsFolder, user.ProfilePhoto);
            var fileBytes = File.ReadAllBytes(filePath);
            base64String = Convert.ToBase64String(fileBytes);
        }





        userDetailDTO.ProfilePhoto = base64String;
        userDetailDTO.FirstName = user.FirstName;
        userDetailDTO.LastName = user.LastName;
        userDetailDTO.CountryName = user.Country != null ? user.Country.CountryName : "";
        userDetailDTO.MemberType = user.MemberType;
        userDetailDTO.Email = user.Email;
        userDetailDTO.competencies = await _compentencyService.GetList();
        userDetailDTO.AboutMe = user.AboutMe;
        userDetailDTO.userCompentencyDetails = await _userCompentencyDetailService.GetList();
        userDetailDTO.Educations = await _educationDetailService.GetList(UserId);
        userDetailDTO.Assignments = await _assignmentService.GetList(UserId);
        userDetailDTO.WorkExperiences = await _workExperienceService.GetList(UserId);
        userDetailDTO.CourseInterestDetails = await _courseInterestService.GetCourseInterestLists();
        userDetailDTO.ChartDetail = await _chartService.GetChartdata(1);
        userDetailDTO.QuizDetail = await _personalityReportService.GetReport(UserId);
        userDetailDTO.QuizQuestion = userDetailDTO.QuizDetail.testNo < 3 ? await _quizService.GetAllQuiz() : null;
        userDetailDTO.Resume = userDetailDTO.UserProgress.isResumeUpload ? await _resumeFileService.GetFileString(UserId) : null;
        userDetailDTO.TextNoteList = await _textNoteService.GetNoteList(UserId);
        userDetailDTO.AudioNoteList = await _audioNoteService.GetNoteList(UserId);
        userDetailDTO.Request = await _requestService.GetRequest(UserId);
        return userDetailDTO;
    }

    public async Task<AboutMeDetailDTO> AddAboutMe(AboutMeDetailDTO aboutMeDetailDTO)
    {
        var entity = await GetByIdAsync(aboutMeDetailDTO.UserId);
        entity.AboutMe = aboutMeDetailDTO.Text;
        var entity1 = await _userRepository.UpdateAsync(entity);
        return aboutMeDetailDTO;
    }

    public async IAsyncEnumerable<string> GetStreamingResponse(string prompt)
    {
       
        using var client = new HttpClient();
        var apiKey = _configuration["OpenAI:ApiKey"];
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

        var content = new StringContent(JsonSerializer.Serialize(new
        {
            prompt = "Write me three poems about llamas, the first in AABB format, the second in ABAB, the third without any rhyming",
    prompt_template = "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are a helpful assistant<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
    presence_penalty = 0,
    frequency_penalty = 0
        }));

        var response = await client.PostAsJsonAsync("https://api.llama3.com/v1/endpoint", content);

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception("Error calling OpenAI API: " + response.ReasonPhrase);
        }

        var jsonResponse = await response.Content.ReadAsStringAsync();
        dynamic result =JsonSerializer.Deserialize<string>(jsonResponse);
        yield return result.choices[0].message.content.ToString();
    }
}