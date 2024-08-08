using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;


namespace PeoplehawkServices.Interface
{
    public interface IQuizService  : IGenericService<Quiz>
    {
        Task<List<QuizDTO>> GetAllQuiz();
    }
}
