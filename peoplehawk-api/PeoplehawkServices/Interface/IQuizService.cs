using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkServices.Interface
{
    public interface IQuizService  : IGenericService<Quiz,QuizDTO>
    {
        Task<List<QuizDTO>> GetAllQuiz();
    }
}
