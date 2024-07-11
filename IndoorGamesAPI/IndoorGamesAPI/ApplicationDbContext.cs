using IndoorGamesAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace IndoorGamesAPI
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<ParticipantDetails> ParticipantDetails { get; set; }


    }
}
