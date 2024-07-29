using AutoMapper;
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

    }
}
