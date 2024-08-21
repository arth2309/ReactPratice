using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkRepositories.Implementation;
public class UserCompentencyDetailRepository : GenericRepository<UserCompentencyDetail>,IUserCompentencyDetailRepository
{
    private readonly ApplicationDbContext _context;

    public UserCompentencyDetailRepository(ApplicationDbContext context) : base(context) 
    {
        _context = context;
    }
}
