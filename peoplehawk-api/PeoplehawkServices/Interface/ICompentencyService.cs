using PeoplehawkServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkServices.Interface
{
    public interface ICompentencyService
    {
        Task<List<CompetencyDTO>> GetList();
    }
}
