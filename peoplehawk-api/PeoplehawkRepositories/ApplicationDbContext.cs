﻿using Microsoft.EntityFrameworkCore;
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
}
