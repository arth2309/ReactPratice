using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;


namespace PeoplehawkServices.Interface;
public interface IAudioNoteService : IGenericService<AudioNote>
{
    Task<AudioNoteDTO> AddNote(AudioNotePostDto audioNotePostDto);

    Task<List<AudioNoteDTO>> GetNoteList(int UserId);

    Task<AudioNoteDTO> DeleteNote(int Id);
}
