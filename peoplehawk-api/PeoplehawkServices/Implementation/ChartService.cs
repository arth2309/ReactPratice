using AutoMapper;
using PeoplehawkRepositories.Interface;
using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using System.Net.Mail;
using System.Net;

namespace PeoplehawkServices.Implementation
{
    public class ChartService : GenericService<Chart,ChartDTO>, IChartService
    {

        private readonly IChartRepository _chartRepository;
        private readonly IMapper _mapper;
        public ChartService(IChartRepository chartRepository,IMapper mapper) : base(chartRepository,mapper) 
        {
            _chartRepository = chartRepository;
            _mapper = mapper;
        }
        

    }
}
