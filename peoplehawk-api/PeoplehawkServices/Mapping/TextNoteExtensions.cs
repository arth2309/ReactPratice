
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Mapping;
public static class TextNoteExtensions
{
    public static TextNoteDto ToDto(this TextNote textNote)
    {
        return new TextNoteDto
        {
            Id = textNote.Id,
            UserId = textNote.UserId,
            textNote = textNote.textNote   
        };
    }

    public static TextNote FromDto(this TextNoteDto textNoteDto)
    {
        return new TextNote
        {
             Id= 0,
             UserId= textNoteDto.UserId,
             textNote = textNoteDto.textNote
        };
    }

    public static List<TextNoteDto> ToDtoList(this List<TextNote> textNoteList) 
    {
        return textNoteList.Select(textNote => textNote.ToDto()).OrderBy(x => x.Id).ToList();
    }
}
