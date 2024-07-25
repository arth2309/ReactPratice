using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {
            CreateMap<Chart, ChartDTO>().ReverseMap();
            CreateMap<CourseInterest, CourseInterestDTO>().ReverseMap();
            CreateMap<ResumeFile, ResumeFileDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();  
            CreateMap<Country, CountryDTO>().ReverseMap();
        }
    }
}
