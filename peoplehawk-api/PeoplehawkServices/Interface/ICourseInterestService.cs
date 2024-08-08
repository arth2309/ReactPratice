using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;


namespace PeoplehawkServices.Interface
{
    public interface ICourseInterestService : IGenericService<CourseInterest>
    {
        Task<List<CourseInterestDTO>> GetCourseInterestLists();
    }
}
