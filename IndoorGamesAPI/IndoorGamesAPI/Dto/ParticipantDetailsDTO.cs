namespace IndoorGamesAPI.Dto
{
    public class ParticipantDetailsDTO
    {
        public int Id { get; set; }

        public string? name { get; set; }

        public string? email { get; set; }

        public string? interested { get; set; }

        public int? number { get; set; }

        public string[]? check { get; set; }

        public string? tableTennisType { get; set; }
    }
}
