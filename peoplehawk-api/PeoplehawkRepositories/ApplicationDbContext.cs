using Microsoft.EntityFrameworkCore;
using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories
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
