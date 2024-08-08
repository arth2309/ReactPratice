using AutoMapper;
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using PeoplehawkServices.Mapping;


namespace PeoplehawkServices.Implementation
{
    public class QuizService : GenericService<Quiz>, IQuizService
    {
        private readonly IQuizRepository _quizRepository;
        private readonly IMapper _mapper;

        public QuizService(IQuizRepository quizRepository, IMapper mapper) : base(quizRepository) 
        {
            _quizRepository = quizRepository;
            _mapper = mapper;
        }

        public async Task<List<QuizDTO>> GetAllQuiz() 
        {
            List<Quiz> quizes =  await  GetAllAsync();
            return  quizes.ToDtoList();
        }
    }
}
