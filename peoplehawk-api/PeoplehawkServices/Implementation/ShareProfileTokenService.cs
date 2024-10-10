using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using PeoplehawkServices.Mapping;
using System.Net.Mail;
using System.Net;

namespace PeoplehawkServices.Implementation
{
    public class ShareProfileTokenService : GenericService<ShareProfileToken>,IShareProfileTokenService
    {
        private readonly IShareProfileTokenRepository _shareProfileRepository;
        private readonly IUserService _userService;
     
        public ShareProfileTokenService(IShareProfileTokenRepository shareProfileRepository,IUserService userService) : base(shareProfileRepository)
        {
            _shareProfileRepository = shareProfileRepository;
            _userService = userService;
      
        }

        public async Task<ShareProfileToken> AddToken(ShareProfileTokenPostDto shareProfileTokenPostDto)
        {
            var entity = await AddAsync(shareProfileTokenPostDto.FromDto());
            return entity;
        }

        public async Task SendEmailAsync(ShareProfileTokenPostDto shareProfileTokenPostDto)
        {
            ShareProfileToken entity = await AddToken(shareProfileTokenPostDto);
           
            MailMessage mm = new MailMessage("arth.gandhi@tatvasoft.com", "arth.gandhi@tatvasoft.com");
            mm.Subject = "Share Profile";
            string mainURL = "http://localhost:3000/candidate/" + entity.Token;
            var htmlBody = $@"<!DOCTYPE html>
<html>
  <body>
    <div style=""font-family: Arial, sans-serif; padding: 20px"">
      <h1 style=""color: #333"">There is a mail for you !</h1>
      <p style=""font-size: 16px; color: #555"">
        Click below button to view profile
        <br />
        Messeage : '{shareProfileTokenPostDto.Message}'
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
          View Profile
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

        public async Task<UserDetailDTO> VerifyToken(string token)
        {
            var entity = await FirstorDefaultAsync(x => x.Token == token);
            if (entity == null)
            {
                throw new ArgumentNullException("token is not valid");
            }

            if (entity.ExpirationDate < DateTime.Now)
            {
                throw new ArithmeticException("token is expire");
            }

            return await _userService.GetDetail(entity.UserId);
        }
    }
}