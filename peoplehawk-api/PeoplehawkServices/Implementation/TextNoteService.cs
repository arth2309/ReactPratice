using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using PeoplehawkServices.Mapping;

namespace PeoplehawkServices.Implementation;
public class TextNoteService : GenericService<TextNote>, ITextNoteService

{
    private readonly ITextNoteRepository _textNoteRepository;
    public TextNoteService(ITextNoteRepository textNoteRepository) : base(textNoteRepository)
   {
        _textNoteRepository = textNoteRepository;
    }

    public async Task<TextNoteDto> AddNote(TextNoteDto textNoteDto)
    {
        var entity = await AddAsync(textNoteDto.FromDto());
        return entity.ToDto();
    }

    public async Task<List<TextNoteDto>> GetNoteList(int UserId)
    {
        var entities = await _textNoteRepository.GetByCriteriaAsync(filter: x => x.UserId == UserId);
        return entities.ToDtoList();
    }

    public async Task<TextNoteDto> DeleteNote(int Id)
    {
        var entity = await DeleteAsync(x => x.Id == Id);
        return entity.ToDto();
    }

}
