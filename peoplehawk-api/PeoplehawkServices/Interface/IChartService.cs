using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Interface;
public interface IChartService : IGenericService<Chart>
{
    Task<ChartDTO> GetChartdata(int UserId);
}
