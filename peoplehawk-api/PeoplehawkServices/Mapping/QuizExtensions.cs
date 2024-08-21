using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;


namespace PeoplehawkServices.Mapping;
public static class QuizExtensions
{
    public static QuizDTO ToDto (this Quiz quiz)
    {
        return new QuizDTO
        {
            Id = quiz.Id,
            Question = quiz.Question
        };
    }

    public static Quiz FromDto (this QuizDTO quizDTO)
    {
        return new Quiz
        {
            Question = quizDTO.Question,
        };
    }

    public static List<QuizDTO> ToDtoList (this List<Quiz> quizes)
    {
        return quizes.Select(quiz => quiz.ToDto()).OrderBy(a => a.Id).ToList();
    }
}
