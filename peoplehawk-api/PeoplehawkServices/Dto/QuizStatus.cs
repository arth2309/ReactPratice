namespace PeoplehawkServices.Dto;

  public class QuizStatus
{
    public bool? IsFirstTestGiven { get; set; }

    public int testNo { get; set; }

    public List<PersonalityReportDTO>? quizResponse { get; set; }

}
