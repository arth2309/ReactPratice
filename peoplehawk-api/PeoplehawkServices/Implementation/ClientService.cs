
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using System.Net.Mail;
using System.Net;
using PeoplehawkServices.Common;
using System.Linq.Expressions;
using PeoplehawkServices.Mapping;

namespace PeoplehawkServices.Implementation;
public class ClientService : GenericService<Client>,IClientService
{
    private readonly IClientRepository _clientRepository;
    private readonly IUserService _userService;
    private readonly IClientPasswordTokenRepository _clientPasswordTokenRepository;
    private readonly IMemberAnalyticsRepository _memberAnalyticsRepository;
    private readonly IUserShortlistRepository _userShortlistRepository;
    private readonly ICandidateClientRepository _candidateClientRepository;

    public ClientService(IClientRepository clientRepository, IUserService userService, IClientPasswordTokenRepository clientPasswordTokenRepository, IMemberAnalyticsRepository memberAnalyticsRepository, IUserShortlistRepository userShortlistRepository,ICandidateClientRepository candidateClientRepository) : base(clientRepository)
    {
        _clientRepository = clientRepository;
        _userService = userService;
        _clientPasswordTokenRepository = clientPasswordTokenRepository;
        _memberAnalyticsRepository = memberAnalyticsRepository;
        _userShortlistRepository = userShortlistRepository;
        _candidateClientRepository = candidateClientRepository;
    }

    public async Task<int> Register(ClientRegisterDto registerDto)
    {
        int id = 0;
        UserDTO userDTO = new();
        userDTO.Id = registerDto.Id;
        userDTO.FirstName = registerDto.FirstName;
        userDTO.LastName = registerDto.LastName;
        userDTO.Email = registerDto.Email;
        userDTO.RoleId = registerDto.RoleId;
        userDTO.CountryId = registerDto.CountryId;

        var entity = await _userService.Register(userDTO);

        if (entity != null) 
        {
            Client client = new();
            client.Id = 0;
            client.UserId = entity.Id;
            client.OrganisationCode = registerDto.OrganisationCode;
            client.AdminId = 1;

            var entity1 = await AddAsync(client);
            id = entity1.Id;
        }

        return id;
    }


  
    public async Task<ClientGetDto> GetClientDetails(int Id)
    {
        Client client = await _clientRepository.FirstOrDefaultWithIncludesAsync(x => x.Id == Id, x => x.User,x => x.User.Country);

        string? base64String;


        if (client.User.ProfilePhoto != null)
        {
            string uploadsFolder = Path.Combine("Files");
            string filePath = Path.Combine(uploadsFolder, client.User.ProfilePhoto);
            var fileBytes = File.ReadAllBytes(filePath);
            base64String = Convert.ToBase64String(fileBytes);
        }

        else
        {
            base64String = null;
        }

        ClientGetDto clientGetDto = new();
        clientGetDto.Id = Id;
        clientGetDto.Email = client.User.Email;
        clientGetDto.FirstName = client.User.FirstName;
        clientGetDto.LastName = client.User.LastName;
        clientGetDto.CountryName = client.User.Country.CountryName;
        clientGetDto.organisationCode = client.OrganisationCode;
        clientGetDto.profilePhoto = base64String;
        clientGetDto.isActive = client.isActive;
        clientGetDto.isAllowed = client.isAllowed;

        return clientGetDto;
    }

    public async Task<PaginatedList<ClientGetDto>> GetClientList(int AdminId = 1)

    {
        var includes = new Expression<Func<Client, object>>[] { x => x.User,x=> x.User.Country};
        PaginatedList<Client> clients = await _clientRepository.GetByPaginatedCriteriaAsync(filter: x => x.AdminId == 1,includes : includes,page : 1,pageSize : 12);
        PaginatedList<ClientGetDto> clientGetDtos = new();
        List<ClientGetDto> clientGetDtos1 = new();
        foreach (var client in clients.items) 
        {
            ClientGetDto clientGetDto = new();

            string? base64String;


            if (client.User.ProfilePhoto != null)
            {
                string uploadsFolder = Path.Combine("Files");
                string filePath = Path.Combine(uploadsFolder, client.User.ProfilePhoto);
                var fileBytes = File.ReadAllBytes(filePath);
                base64String = Convert.ToBase64String(fileBytes);
            }

            else
            {
                base64String = null;
            }

            clientGetDto.Id = client.Id;
            clientGetDto.Email = client.User.Email;
            clientGetDto.FirstName = client.User.FirstName;
            clientGetDto.LastName = client.User.LastName;
            clientGetDto.CountryName = client.User.Country.CountryName;
            clientGetDto.organisationCode = client.OrganisationCode;
            clientGetDto.profilePhoto = base64String;
            clientGetDto.isActive = client.isActive;

            clientGetDtos1.Add(clientGetDto);
        }

        clientGetDtos.TotalCount = clients.TotalCount;
        clientGetDtos.Page = clients.Page;
        clientGetDtos.PageSize = clients.PageSize;
        clientGetDtos.items = clientGetDtos1;

        return clientGetDtos;
     }

    public async Task SendInvitationLink(string email)
    {
        User user = await _userService.FirstorDefaultAsync(x => x.Email == email);

        if (user == null) 
        {
            throw new Exception(ErrorMessages.UserNotFound);
        }

        ClientPasswordToken clientPasswordToken1 = await _clientPasswordTokenRepository.FirstOrDefaultAsync(x => x.UserId == user.Id);

        string token = TokenGenerator.GenerateToken();

        if (clientPasswordToken1 == null) 
        {
            ClientPasswordToken clientPasswordToken = new();
            clientPasswordToken.ExpirationDate = DateTime.UtcNow.AddDays(1);
            clientPasswordToken.token = token;
            clientPasswordToken.UserId = user.Id;
            await _clientPasswordTokenRepository.AddAsync(clientPasswordToken);
        }

        else
        {
            clientPasswordToken1.token = token; ;
            clientPasswordToken1.ExpirationDate = DateTime.UtcNow.AddDays(1);
            await _clientPasswordTokenRepository.UpdateAsync(clientPasswordToken1);
        }
      


        MailMessage mm = new MailMessage("arth.gandhi@tatvasoft.com", "arth.gandhi@tatvasoft.com");
        mm.Subject = "Generate Password";
        string mainURL = "http://localhost:3000/create-password?email=" + email + "&token=" + token;
        var htmlBody = $@"<!DOCTYPE html>
<html>
  <body>
    <div style=""font-family: Arial, sans-serif; padding: 20px"">
      <h1 style=""color: #333"">There is a mail from PeopleHawk!</h1>
      <p style=""font-size: 16px; color: #555"">
        Your account is successfully created Click to Create Password
      </p>
      <p>
        <a
          href='{mainURL}'
          style=""
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #009702;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          ""
        >
          Create
        </a>
      </p>
    </div>
  </body>
</html>
";

        mm.Body = htmlBody;
        mm.IsBodyHtml = true;
        SmtpClient smtp = new SmtpClient();
        smtp.Host = "mail.etatvasoft.com";
        smtp.EnableSsl = true;
        smtp.UseDefaultCredentials = false;
        smtp.Credentials = new NetworkCredential(userName: "arth.gandhi@tatvasoft.com", password: "bishop@2002");
        smtp.Port = 587;
        await smtp.SendMailAsync(mm);
    }

    public async Task<bool> VerifyToken(string email,string token)
    {
        var entity = await _clientPasswordTokenRepository.FirstOrDefaultAsync(x => x.token == token);
        if (entity == null)
        {
            throw new ArgumentNullException("token is not valid");
        }

        if (entity.ExpirationDate < DateTime.Now)
        {
            throw new ArithmeticException("token is expire");
        }

        User user = await _userService.FirstorDefaultAsync(x => x.Email == email);

        if (user == null) 
        {
            throw new ArithmeticException(ErrorMessages.UserNotFound);
        }

        if(user.Id != entity.UserId) 
        {
            throw new ArithmeticException(ErrorMessages.UserNotFound);
        }
        

        return true;
    }

    public async Task<bool> CreatePassword(LoginDetails loginDetails)
    {
        User user = await _userService.FirstorDefaultAsync(x => x.Email == loginDetails.email);
        if (user == null) 
        {
            throw new ArithmeticException(ErrorMessages.UserNotFound);
        }
        user.Password = HashHelper.HashedInput(loginDetails.password);
        Client client = await _clientRepository.FirstOrDefaultAsync(x => x.UserId == user.Id);  
        client.isActive = true;
        await _clientRepository.UpdateAsync(client);

        ClientPasswordToken clientPasswordToken = await _clientPasswordTokenRepository.FirstOrDefaultAsync(x => x.UserId == user.Id);
        clientPasswordToken.ExpirationDate = DateTime.UtcNow;
        await _clientPasswordTokenRepository.UpdateAsync(clientPasswordToken);

        await _userService.UpdateAsync(user);
        return true;
    }

    public async Task<PaginatedList<MemberAnalyticsDTO>> GetList(
       int page,
       int userId,
       int typeId,
         bool isResume = false,
         bool isPersonalityTest = false,
      string sortOrder = "asc", int orderedBy = 0,
       bool isProfilePhoto = false, string? searchTerm = null, int? countryId = 0, string? memberType = null)
    {

        User user = await _userService.GetByIdAsync(userId);

        IEnumerable<int> userIds = null;

        if (user.RoleId == 3)
        {
          userIds= await _candidateClientRepository.GetUserIdsByClientIdAsync(typeId);
        }
        
        var includes = new Expression<Func<MemberAnalytics, object>>[] { x => x.user, x => x.user.Country, x => x.OwnedBy, x => x.completion };
        Expression<Func<MemberAnalytics, bool>> filter = a =>
         (user.RoleId == 2 || userIds == null && !userIds.Any() || userIds.Contains(a.user.Id))&&
        (countryId == 0 || a.user.CountryId == countryId) &&
        (searchTerm == null || a.user.FirstName.ToLower().Contains(searchTerm.ToLower())) &&
        (memberType == null || a.user.MemberType == memberType) &&
        (!isProfilePhoto || a.user.ProfilePhoto != null) &&
        (!isResume || a.completion.IsCVUploaded) &&
        (!isPersonalityTest || a.completion.IsPersonalityQuizGiven);

        Func<IQueryable<MemberAnalytics>, IOrderedQueryable<MemberAnalytics>> orderBy;

        if (orderedBy == 2)
        {
            orderBy = sortOrder.ToLower() switch
            {
                "asc" => q => q.OrderBy(u => u.user.FirstName),
                "desc" => q => q.OrderByDescending(u => u.user.FirstName),
                _ => q => q.OrderBy(u => u.Id)
            };
        }

        else
        {
            orderBy = sortOrder.ToLower() switch
            {
                "asc" => q => q.OrderBy(u => u.Id),
                "desc" => q => q.OrderByDescending(u => u.user.Id),
                _ => q => q.OrderBy(u => u.Id)
            };
        }


        PaginatedList<MemberAnalytics> memberAnalytics = await _memberAnalyticsRepository.GetByPaginatedCriteriaAsync(filter: filter, page: page, includes: includes, pageSize: 6, orderBy: orderBy);
        PaginatedList<MemberAnalyticsDTO> memberAnalyticsDTOs = new PaginatedList<MemberAnalyticsDTO>();

        memberAnalyticsDTOs.TotalCount = memberAnalytics.TotalCount;
        memberAnalyticsDTOs.Page = memberAnalytics.Page;
        memberAnalyticsDTOs.PageSize = memberAnalytics.PageSize;
        memberAnalyticsDTOs.items = new List<MemberAnalyticsDTO>();

        foreach (var member in memberAnalytics.items)
        {
            MemberAnalyticsDTO dto = member.ToDto();
            var userShortlist = await _userShortlistRepository.GetByCriteriaAsync(filter: x => x.UserId == member.UserId, includes: x => x.Shortlists);
            dto.Shortlist = userShortlist.Select(x => x.Shortlists).ToList();
            memberAnalyticsDTOs.items.Add(dto);
        }

        return memberAnalyticsDTOs;
    }

    public async Task<ClientIsAllowedDto> ChangeClientIsAllowed(ClientIsAllowedDto clientIsAllowed)
    {
        Client client = await GetByIdAsync(clientIsAllowed.ClientId);
        client.isAllowed = clientIsAllowed.isAllowed;
        await UpdateAsync(client);
        return clientIsAllowed;
    }
    
    public async Task<ClientRegisterDto> UpdateClient(int id,ClientRegisterDto clientRegisterDto)
    {
        Client client = await GetByIdAsync(id);
         if(client == null) 
        {
            throw new Exception(ErrorMessages.ClientNotFound);
        }

         if(client.OrganisationCode != clientRegisterDto.OrganisationCode)
        {
            client.OrganisationCode = clientRegisterDto.OrganisationCode;
            await UpdateAsync(client);
        }

         User user = await _userService.GetByIdAsync(client.UserId);
        if (user == null)
        {
            throw new Exception(ErrorMessages.UserNotFound);
        }
        user.Email = clientRegisterDto.Email;
        user.FirstName = clientRegisterDto.FirstName;    
        user.LastName = clientRegisterDto.LastName;
        await _userService.UpdateAsync(user);

        return clientRegisterDto;
    }
}