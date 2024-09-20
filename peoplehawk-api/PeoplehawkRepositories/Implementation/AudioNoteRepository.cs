
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories.Implementation;

public class AudioNoteRepository : GenericRepository<AudioNote>, IAudioNoteRepository
{
    private readonly ApplicationDbContext _context;

    public AudioNoteRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }   
}
