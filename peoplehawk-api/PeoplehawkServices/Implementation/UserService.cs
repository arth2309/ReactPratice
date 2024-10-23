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
    private readonly ICandidateRepository _candidateRepository;
    private readonly IClientRepository _clientRepository;
    private readonly IAdminRepository _adminRepository;
    private readonly ICandidateClientRepository _candidateClientRepository;
    private string secretKey;

    public UserService(IUserRepository userRepository, IMapper mapper, IConfiguration configuration, IMemberAnalyticsService memberAnalyticsService, IPersonalityReportService personalityReportService, ICompletionRepository completionRepository, IResumeFileService resumeFileService, IWorkExperienceService workExperienceService, IAssignmentService assignmentService, IEducationDetailService educationDetailService, IUserCompentencyDetailService userCompentencyDetailService, ICompentencyService compentencyService, IChartService chartService, ICourseInterestService courseInterestService, IQuizService quizService, IAudioNoteService audioNoteService, ITextNoteService textNoteService, IRequestService requestService,ICandidateRepository candidateRepository,IAdminRepository adminRepository,IClientRepository clientRepository,ICandidateClientRepository candidateClientRepository) : base(userRepository)
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
        _candidateRepository = candidateRepository;
        _adminRepository = adminRepository;
        _clientRepository = clientRepository;
        _candidateClientRepository = candidateClientRepository;
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

        int typeId = 0;

        if(user.RoleId == 1)
        {
            Candidate candidate = await _candidateRepository.FirstOrDefaultAsync(x => x.UserId == user.Id);
            typeId = candidate.Id;
        }
        else if(user.RoleId == 2)
        {
            Admin admin = await _adminRepository.FirstOrDefaultAsync(x => x.UserId == user.Id);
            typeId = admin.Id;
        }
        else if(user.RoleId == 3) 
        {
            Client client = await _clientRepository.FirstOrDefaultAsync(x => x.UserId == user.Id);  
            typeId= client.Id;
        }

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, Convert.ToString(user.Id)),
                new Claim (ClaimTypes.Role,user.Role.RoleName ?? ""),
                 new Claim("typeId",Convert.ToString(typeId)),
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
        int clientId = 0;

        if (user != null)
        {
            throw new BadHttpRequestException(ErrorMessages.EmailAlreadyExist);
        }

        if (!userDTO.OrganisationCode.IsNullOrEmpty())
        {
            Client client = await _clientRepository.FirstOrDefaultAsync(x => x.OrganisationCode == userDTO.OrganisationCode);

            if(client == null && !client.isActive) 
            {
                throw new BadHttpRequestException(ErrorMessages.OrganisatinCodeError);
            }

            else
            {
                clientId = client.Id;
            }
        }

       
        userDTO.Password = userDTO.Password != null ? HashHelper.HashedInput(userDTO.Password) : null;
        var entity = await AddAsync(_mapper.Map<User>(userDTO));
        userDTO.Id = entity.Id;

        if(userDTO.RoleId == 1)
        {

            Completion completion = new Completion();
            completion.UserId = entity.Id;
            var entity1 = await _completionRepository.AddAsync(completion);

            MemberAnalytics memberAnalytics = new MemberAnalytics();
            memberAnalytics.UserId = entity.Id;
            memberAnalytics.CompletionId = entity1.Id;
            await _memberAnalyticsService.AddAsync(memberAnalytics);

            Candidate candidate = new();
            candidate.UserId = entity.Id;
            candidate.MemberType = userDTO.MemberType;
            var entity2 = await _candidateRepository.AddAsync(candidate);   

            if(clientId > 0)
            {
                CandidateClient candidateClient = new();
                candidateClient.ClientId = clientId;
                candidateClient.CandidateId = entity2.Id;
                await _candidateClientRepository.AddAsync(candidateClient);
            }
            
        }
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

        var candidate = await _candidateRepository.FirstOrDefaultWithIncludesAsync(x => x.UserId == UserId, x => x.User);

        ClientDto clientDto = new();
        User clientUser = await _candidateRepository.getUser(UserId);
        if(clientUser != null)
        {
            clientDto.FirstName = clientUser.FirstName;
            clientDto.LastName = clientUser.LastName;
            clientDto.Email = clientUser.Email;
            clientDto.ClientId = clientUser.Id;
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
        userDetailDTO.OwnedBy_Client = clientUser != null ? clientDto : null;
        return userDetailDTO;
    }

    public async Task<AboutMeDetailDTO> AddAboutMe(AboutMeDetailDTO aboutMeDetailDTO)
    {
        var entity = await GetByIdAsync(aboutMeDetailDTO.UserId);
        entity.AboutMe = aboutMeDetailDTO.Text;
        var entity1 = await _userRepository.UpdateAsync(entity);
        return aboutMeDetailDTO;
    }

    
}