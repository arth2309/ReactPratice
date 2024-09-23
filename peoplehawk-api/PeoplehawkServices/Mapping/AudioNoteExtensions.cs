using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Mapping;
public static class AudioNoteExtensions
{
    public static AudioNoteDTO ToDto(this AudioNote audioNote)
    {
        string? base64String;


        if (audioNote.filePath != null)
        {
            
            string filePath = Path.Combine(audioNote.filePath);
            var fileBytes = File.ReadAllBytes(filePath);
            base64String = Convert.ToBase64String(fileBytes);
        }

        else
        {
            base64String = null;
        }

        return new AudioNoteDTO
        {
            Id = audioNote.Id,
            UserId = audioNote.UserId,
            file = base64String
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
           
            UserId = audioNotePostDto.UserId,
            filePath = Path.Combine("/Audios", audioNotePostDto.formFile.FileName)
    };

    }

    public static List<AudioNoteDTO> ToDtoList(this List<AudioNote> audioNoteList) 
    {
        return audioNoteList.Select(audioNote => audioNote.ToDto()).OrderBy(x => x.Id).ToList();   
    }
}
