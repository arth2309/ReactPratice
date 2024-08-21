using AutoMapper;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices;
public class MappingConfig : Profile
{
    public MappingConfig()
    {
        CreateMap<Chart, ChartDTO>().ReverseMap();
        CreateMap<CourseInterest, CourseInterestDTO>().ReverseMap();
        CreateMap<ResumeFile, ResumeFileDTO>().ReverseMap();
        CreateMap<User, UserDTO>().ReverseMap();  
        CreateMap<Country, CountryDTO>().ReverseMap();
        CreateMap<PersonalityReport, PersonalityReportDTO>().ReverseMap();  
    }
}
