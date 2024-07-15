using AutoMapper;
using peoplehawk_api.Dto;
using peoplehawk_api.Models;

namespace peoplehawk_api
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {
            CreateMap<Chart,ChartDTO>().ReverseMap();
            CreateMap<CourseInterest,CourseInterestDTO>().ReverseMap();
            CreateMap<ResumeFile,ResumeFileDTO>().ReverseMap();
        }
    }
}
