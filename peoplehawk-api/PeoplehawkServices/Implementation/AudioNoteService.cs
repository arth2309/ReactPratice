
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using PeoplehawkServices.Mapping;

namespace PeoplehawkServices.Implementation;

public class AudioNoteService : GenericService<AudioNote>, IAudioNoteService
{
    private readonly IAudioNoteRepository _audioNoteRepository;
    public AudioNoteService(IAudioNoteRepository audioNoteRepository) : base(audioNoteRepository)
    {
        _audioNoteRepository = audioNoteRepository;
    }

    public async Task<AudioNoteDTO> AddNote(AudioNotePostDto audioNotePostDto)
    {
        var entity = await AddAsync(await audioNotePostDto.FromDto());
        return entity.ToDto();
    }

    public async Task<List<AudioNoteDTO>> GetNoteList(int UserId)
    {
       var entities = await _audioNoteRepository.GetByCriteriaAsync(filter : x => x.UserId == UserId);
        return entities.ToDtoList();
    }
}
