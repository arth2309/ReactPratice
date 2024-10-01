using PeoplehawkRepositories.Models;

namespace PeoplehawkServices.Interface;
public interface ICompletionService : IGenericService<Completion>
{
    Task<bool> ManageNotes(int UserId, bool isNote);
}
