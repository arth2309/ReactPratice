using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Interface;

namespace PeoplehawkServices.Implementation;

public class CompletionService : GenericService<Completion>, ICompletionService
{
    private readonly ICompletionRepository _completionRepository;
 
    public CompletionService(ICompletionRepository completionRepository) : base(completionRepository)
    {
        _completionRepository = completionRepository;
    }

    public async Task<bool> ManageNotes(int UserId,bool isNote)
    {
        Completion completion = await _completionRepository.FirstOrDefaultAsync(x => x.UserId == UserId);
        if(completion != null) 
        {
            completion.IsDocumentGiven = isNote;
            await _completionRepository.UpdateAsync(completion);
        }
        return isNote;
    }
}
