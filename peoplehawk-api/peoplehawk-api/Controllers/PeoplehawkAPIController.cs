using AutoMapper;
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
        private readonly IWebHostEnvironment _webHostEnvironment;

        public PeoplehawkAPIController(ApplicationDbContext context, IMapper mapper, IWebHostEnvironment webHostEnvironment)    
        {
            _context = context;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("{Id:int}",Name = "GetChartData")]
        public async  Task<ActionResult<ChartDTO>> GetChartData(int Id)
        {
            if(Id == 0) 
            {
                return BadRequest();
            }

            Chart chart = await _context.Charts.FirstOrDefaultAsync(u => u.Id == Id);
            return chart != null ? Ok(_mapper.Map<ChartDTO>(chart)): NotFound();


        }

        [HttpGet]
        public async Task<IEnumerable<CourseInterestDTO>> GetCourseInterestsData()
        {
           List<CourseInterest> courseInterest = await _context.CourseInterests.OrderByDescending(u => u.Id).ToListAsync();
           return _mapper.Map<List<CourseInterestDTO>>(courseInterest);
        }

        [HttpPost("Files")]
        public async Task<ActionResult<ResumeFile>> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("File is null or empty");
            }

            try
            {
                string uploadsFolder = Path.Combine( "Files");
        
                string filePath = Path.Combine(uploadsFolder, file.FileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                ResumeFile fileEntity = new ResumeFile
                {
                    FileName = file.FileName,
                    FilePath = Path.Combine("/Files", file.FileName), // Store relative path
                    UploadDate = DateTime.Now
                };

                _context.ResumeFiles.Add(fileEntity);
                await _context.SaveChangesAsync();

                return fileEntity;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}
