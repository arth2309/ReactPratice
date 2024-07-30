﻿using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using PeoplehawkServices.Common;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;
using System.Linq.Expressions;

namespace PeoplehawkServices.Implementation
{
    public class UserService : GenericService<User,UserDTO>,IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private string secretKey;

        public UserService(IUserRepository userRepository,IMapper mapper, IConfiguration configuration) : base(userRepository,mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            secretKey = configuration.GetValue<string>("Jwt:Secret");
        }

        public async Task<string> Login(string email,string password)
        {

            User user = await _userRepository.FirstOrDefaultAsync(a => a.Email == email && a.Password == HashHelper.HashedInput(password));

            if (user == null) 
            {
                throw new KeyNotFoundException();
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
            await _userRepository.AddAsync(_mapper.Map<User>(userDTO));
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
            List<User> users =  await _userRepository.GetByCriteria(predicate);
     
           return  _mapper.Map<List<UserDTO>>(users);
        }

    }
}
