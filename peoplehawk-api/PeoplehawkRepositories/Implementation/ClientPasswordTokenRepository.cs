using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
namespace PeoplehawkRepositories.Implementation;
public class ClientPasswordTokenRepository : GenericRepository<ClientPasswordToken>,IClientPasswordTokenRepository
{
    private readonly ApplicationDbContext _context;
    
    public ClientPasswordTokenRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
}