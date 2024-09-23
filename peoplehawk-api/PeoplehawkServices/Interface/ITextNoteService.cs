using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Interface
{
    public  interface ITextNoteService : IGenericService<TextNote>
    {
        Task<TextNoteDto> AddNote(TextNoteDto textNoteDto);

        Task<List<TextNoteDto>> GetNoteList(int UserId);
    }
}
