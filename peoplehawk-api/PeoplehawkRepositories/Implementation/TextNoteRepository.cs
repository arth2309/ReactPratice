using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories.Implementation;
public class TextNoteRepository : GenericRepository<TextNote>,ITextNoteRepository
{
    private readonly ApplicationDbContext _context;
     
    public TextNoteRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
}
