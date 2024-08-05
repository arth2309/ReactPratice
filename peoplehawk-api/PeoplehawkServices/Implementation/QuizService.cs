using AutoMapper;
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using PeoplehawkServices.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkServices.Implementation
{
    public class QuizService : GenericService<Quiz,QuizDTO>, IQuizService
    {
        private readonly IQuizRepository _quizRepository;
        private readonly IMapper _mapper;

        public QuizService(IQuizRepository quizRepository, IMapper mapper) : base(quizRepository, mapper) 
        {
            _quizRepository = quizRepository;
            _mapper = mapper;
        }

        public async Task<List<QuizDTO>> GetAllQuiz() 
        {
            List<Quiz> quizes =  await  _quizRepository.GetAllAsync();
            return  quizes.ToDtoList();
        }
    }
}
