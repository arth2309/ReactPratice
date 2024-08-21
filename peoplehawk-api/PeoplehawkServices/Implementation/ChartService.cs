using AutoMapper;
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;

namespace PeoplehawkServices.Implementation;
public class ChartService : GenericService<Chart>, IChartService
{
    private readonly IChartRepository _chartRepository;
    private readonly IMapper _mapper;

    public ChartService(IChartRepository chartRepository,IMapper mapper) : base(chartRepository) 
    {
        _chartRepository = chartRepository;
        _mapper = mapper;
    }
    
    public async Task<ChartDTO> GetChartdata(int UserId)
    {
        Chart chart = await FirstorDefaultAsync(a => a.UserId == UserId);
        return _mapper.Map<ChartDTO>(chart);
    }
}

