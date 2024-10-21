using Microsoft.EntityFrameworkCore;
using PeoplehawkRepositories.Models;

namespace PeoplehawkRepositories;
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { 


    }
    public DbSet<Chart> Charts { get; set; }

    public DbSet<CourseInterest> CourseInterests { get; set; }

    public DbSet<ResumeFile> ResumeFiles { get; set; }

    public DbSet<User> Users { get; set; }

    public DbSet<Country> Countrys { get; set; }

    public DbSet<Role> Roles { get; set; }

    public DbSet<Quiz> Quizes { get; set; }

    public DbSet<PersonalityReport> PersonalityReports { get; set; }

    public DbSet<Competency> Competencys { get; set;}

    public DbSet<UserCompentencyDetail> UserCompentencyDetails { get; set; }

    public DbSet<MemberAnalytics> MemberAnalytics { get; set; }

    public DbSet<Completion> Completions { get; set; }

    public DbSet<Owner> Owners { get; set; }

    public DbSet<EducationDetail> EducationDetails { get; set; }

    public DbSet<Assignment> AssignmentDetails { get; set; }

    public DbSet<WorkExperience> WorkExperienceDetails { get; set;}
    public DbSet<AudioNote> AudioNotes { get; set; }

    public DbSet<TextNote> TextNotes { get; set; }

    public DbSet<Request> requests { get; set; }

    public DbSet<Shortlist> shortlists { get; set; }

    public DbSet<UserShortlist> userShortlists {get; set;}

    public DbSet<ShareProfileToken> shareProfileToken { get; set; }

    public DbSet<Candidate> Candidates { get; set; }

    public DbSet<Client> Clients { get; set; }

    public DbSet<Admin> Admins { get; set; }

    public DbSet<ClientPasswordToken> ClientPasswordTokens { get; set; }

    public DbSet<CandidateClient> CandidatesClients { get; set; }  
}
