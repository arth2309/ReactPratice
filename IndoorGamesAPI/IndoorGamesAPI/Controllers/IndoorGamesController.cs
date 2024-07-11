using AutoMapper;
using IndoorGamesAPI.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IndoorGamesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IndoorGamesController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public IndoorGamesController (ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        

       

    }
}
