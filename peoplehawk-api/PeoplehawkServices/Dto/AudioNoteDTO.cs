using Microsoft.AspNetCore.Http;

namespace PeoplehawkServices.Dto;

public class AudioNoteDTO
{
    public int? Id { get; set; }

    public int? UserId { get; set; }

    public string? file { get; set; }
}
