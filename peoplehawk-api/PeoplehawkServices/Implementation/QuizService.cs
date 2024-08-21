using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using PeoplehawkServices.Mapping;


namespace PeoplehawkServices.Implementation;

public class QuizService : GenericService<Quiz>, IQuizService
{
    private readonly IQuizRepository _quizRepository;
    public QuizService(IQuizRepository quizRepository) : base(quizRepository) 
    {
        _quizRepository = quizRepository;
    }

    public async Task<List<QuizDTO>> GetAllQuiz() 
    {
        List<Quiz> quizes =  await  GetAllAsync();
        return  quizes.ToDtoList();
    }
}
