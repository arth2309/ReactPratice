using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeoplehawkServices.Dto;
using PeoplehawkServices.Interface;
using System.Runtime.CompilerServices;

namespace peoplehawk_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeoplehawkAPIController : ControllerBase
    {
        private readonly ICourseInterestService _courseInterestService;
        private readonly IChartService _chartService;

        public PeoplehawkAPIController(ICourseInterestService courseInterestService,IChartService chartService)    
        {
           _courseInterestService = courseInterestService;
            _chartService = chartService;
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<ChartDTO>> Chart(int Id)
        {
            return await _chartService.GetByIdAsync(Id);
        }

        [HttpGet]
        public async  Task<List<CourseInterestDTO>> CourseInterests()
        {
            return await _courseInterestService.GetAllAsync();
        }

        //[HttpPost("Files")]
        //public async Task<ActionResult<ResumeFile>> UploadFile(IFormFile file)
        //{
        //    if (file == null || file.Length == 0)
        //    {
        //        return BadRequest("File is null or empty");
        //    }


        //        string uploadsFolder = Path.Combine( "Files");
        //        string filePath = Path.Combine(uploadsFolder, file.FileName);
        //        using (var stream = new FileStream(filePath, FileMode.Create))
        //        {
        //            await file.CopyToAsync(stream);
        //        }

        //        ResumeFile resumeFile = new ResumeFile
        //        {
        //            FileName = file.FileName,
        //            FilePath = Path.Combine("/Files", file.FileName),
        //            UserId = 1,
        //            UploadDate = DateTime.Now
        //        };

        //        _context.ResumeFiles.Add(resumeFile);
        //        await _context.SaveChangesAsync();

        //        return resumeFile;


        //}

        //[HttpGet("Files/{UserId:int}")]
        //public async  Task<IActionResult> GetFile(int UserId)
        //{
        //    if(UserId == 0)
        //    {
        //        return BadRequest();
        //    }

        //    ResumeFile resumeFile = await _context.ResumeFiles.FirstOrDefaultAsync(a => a.UserId == UserId);

        //    if (resumeFile == null)
        //    {
        //        return NotFound();
        //    }

        //    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Files", resumeFile.FileName);
        //    var fileBytes = System.IO.File.ReadAllBytes(filePath);
        //    return File(fileBytes, "application/pdf", resumeFile.FileName); 
        //}

        //[HttpDelete("Files/{UserId:int}")]
        //public async Task<IActionResult> DeleteFile(int UserId)
        //{
        //    if(UserId == 0)
        //    {
        //        return BadRequest();
        //    }

        //    ResumeFile resumeFile = await _context.ResumeFiles.FirstOrDefaultAsync(a => a.UserId == UserId);

        //    if(resumeFile == null) 
        //    {
        //        return NotFound();
        //    }

        //    _context.ResumeFiles.Remove(resumeFile);
        //    await _context.SaveChangesAsync();
        //    return Ok(resumeFile);

        //}

        //[HttpPut("Files/{UserId:int}")]

        //public async Task<ActionResult<ResumeFile>> UpdateFile(IFormFile file,int UserId)
        //{
        //    if (file == null || file.Length == 0 || UserId == 0)
        //    {
        //        return BadRequest("File is null or empty");
        //    }

        //    ResumeFile resumeFile = await _context.ResumeFiles.FirstOrDefaultAsync(a =>a.UserId == UserId);    

        //    if(resumeFile == null)
        //    {
        //        return NotFound();
        //    }

        //string uploadsFolder = Path.Combine("Files");
        //        string filePath = Path.Combine(uploadsFolder, file.FileName);
        //        using (var stream = new FileStream(filePath, FileMode.Create))
        //        {
        //            await file.CopyToAsync(stream);
        //        }

        //        resumeFile.UploadDate = DateTime.Now;
        //        resumeFile.FileName = file.FileName;
        //        resumeFile.FilePath= Path.Combine("/Files", file.FileName);



        //        _context.ResumeFiles.Update(resumeFile);
        //        await _context.SaveChangesAsync();

        //        return resumeFile;


        //}
    }

 


}
