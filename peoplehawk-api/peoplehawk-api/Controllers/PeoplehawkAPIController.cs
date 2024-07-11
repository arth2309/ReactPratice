using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using peoplehawk_api.Dto;
using peoplehawk_api.Models;

namespace peoplehawk_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeoplehawkAPIController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public PeoplehawkAPIController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("{Id:int}",Name = "GetChartData")]
        public async Task<ActionResult<ChartDTO>> GetChartData(int Id)
        {
            if(Id == 0) 
            {
                return BadRequest();
            }

            Chart chart = await _context.Charts.FirstOrDefaultAsync(u => u.Id == Id);

            if(chart == null) 
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ChartDTO>(chart));


        }

        [HttpGet]
        public IEnumerable<CourseInterest> GetCourseInterestsData()
        {
            return _context.CourseInterests.OrderBy(u => u.Id).ToList();
        }
    }
}
