using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;


namespace PeoplehawkRepositories.Implementation;

public class CountryRepository : GenericRepository<Country>, ICountryRepository
{
    private readonly ApplicationDbContext _context;

    public CountryRepository(ApplicationDbContext context) : base(context) 
    {
        _context = context;
    }
}
