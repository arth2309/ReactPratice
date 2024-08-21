using AutoMapper;
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;

namespace PeoplehawkServices.Implementation;
public class CourseInterestService : GenericService<CourseInterest>, ICourseInterestService
{
    private readonly ICourseInterestRepository _courseInterestRepository;
    private readonly IMapper _mapper;

    public CourseInterestService(ICourseInterestRepository courseInterestRepository,IMapper mapper) : base(courseInterestRepository) 
    {
        _courseInterestRepository = courseInterestRepository;
        _mapper = mapper;
    }

    public async  Task<List<CourseInterestDTO>> GetCourseInterestLists()
    {
        List<CourseInterest> courseInterests = await GetAllAsync();
        return _mapper.Map<List<CourseInterestDTO>>(courseInterests);   
    }
   
}
