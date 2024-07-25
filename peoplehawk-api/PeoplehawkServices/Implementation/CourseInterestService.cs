using AutoMapper;
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace PeoplehawkServices.Implementation
{
    public class CourseInterestService : GenericService<CourseInterest,CourseInterestDTO>, ICourseInterestService
    {
        private readonly ICourseInterestRepository _courseInterestRepository;
        private readonly IMapper _mapper;
    
        public CourseInterestService(ICourseInterestRepository courseInterestRepository,IMapper mapper) : base(courseInterestRepository,mapper) 
        {
            _courseInterestRepository = courseInterestRepository;
            _mapper = mapper;
        }

       
       
        
    }
}
