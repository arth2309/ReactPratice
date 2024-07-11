using AutoMapper;
using IndoorGamesAPI.Dto;
using IndoorGamesAPI.Models;

namespace IndoorGamesAPI
{
    public class MappingConfig : Profile
    {
        public MappingConfig() 
        {
            CreateMap<ParticipantDetails, ParticipantDetailsDTO>().ReverseMap();
        }
    }
}
