using Microsoft.EntityFrameworkCore;
using peoplehawk_api.Models;

namespace peoplehawk_api
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { 


        }
        public DbSet<Chart> Charts { get; set; }

        public DbSet<CourseInterest> CourseInterests { get; set; }

        public DbSet<ResumeFile> ResumeFiles { get; set; }
    }
}
