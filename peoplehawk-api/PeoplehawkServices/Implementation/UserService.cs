﻿using AutoMapper;
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


namespace PeoplehawkServices.Implementation
{
    public class UserService : GenericService<User>,IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private string secretKey;

        public UserService(IUserRepository userRepository,IMapper mapper, IConfiguration configuration) : base(userRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            secretKey = configuration.GetValue<string>("Jwt:Secret");
        }

        public async Task<string> Login(LoginDetails loginDetails)
        {

            User user = await FirstorDefaultAsync(a => a.Email == loginDetails.email && a.Password == HashHelper.HashedInput(loginDetails.password));

            if (user == null) 
            {
                throw new KeyNotFoundException("Invalid credantials");
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
           
            userDTO.Password = HashHelper.HashedInput(userDTO.Password);
            await AddAsync(_mapper.Map<User>(userDTO));
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
            List<User> users =  await GetByCriteria(predicate);
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
                throw new KeyNotFoundException("Photo is not present");
            }
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Files", user.ProfilePhoto);
            var fileBytes = File.ReadAllBytes(filePath);
            return (fileBytes, user.ProfilePhoto);
        }
    }
}
