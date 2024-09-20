using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Mapping;
public static class AudioNoteExtensions
{
    public static AudioNoteDTO ToDto(this AudioNote audioNote)
    {
        return new AudioNoteDTO
        {
            Id = audioNote.Id,
            UserId = audioNote.UserId,
            filePath = audioNote.filePath
        };
    }

    public static AudioNote FromDto(this AudioNotePostDto audioNotePostDto) 
    {
        
        string uploadsFolder = Path.Combine("Audios");
        string filePath = Path.Combine(uploadsFolder, audioNotePostDto.formFile.FileName);
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
             audioNotePostDto.formFile.CopyToAsync(stream);
        }

        return new AudioNote
        {
            Id = 0,
            UserId = audioNotePostDto.UserId,
            filePath = Path.Combine("/Audios", audioNotePostDto.formFile.FileName)
    };
    }
}
