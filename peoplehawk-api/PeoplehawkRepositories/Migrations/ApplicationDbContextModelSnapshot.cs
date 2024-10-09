﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using PeoplehawkRepositories;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.20")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("PeoplehawkRepositories.Models.Assignment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("InfohraphicResumeDescription")
                        .HasColumnType("text");

                    b.Property<bool>("IsOngoing")
                        .HasColumnType("boolean");

                    b.Property<DateTime?>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.Property<string>("organisation")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AssignmentDetails");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.AudioNote", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int?>("Id"));

                    b.Property<DateTime>("SendDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("UserId")
                        .IsRequired()
                        .HasColumnType("integer");

                    b.Property<string>("filePath")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AudioNotes");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.Chart", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("A")
                        .HasColumnType("integer");

                    b.Property<int>("C")
                        .HasColumnType("integer");

                    b.Property<int>("E")
                        .HasColumnType("integer");

                    b.Property<int>("I")
                        .HasColumnType("integer");

                    b.Property<int>("R")
                        .HasColumnType("integer");

                    b.Property<int>("S")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.Property<string>("career_code")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("created_at")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Charts");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.Competency", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Competency_part")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Competencys");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.Completion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsCVOptimized")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsCVUploaded")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsCompentencyQuizGiven")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsDocumentGiven")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsGames")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsPersonalityQuizGiven")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsVideoInterview")
                        .HasColumnType("boolean");

                    b.Property<int?>("UserId")
                        .IsRequired()
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Completions");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.Country", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("CountryCode")
                        .HasColumnType("text");

                    b.Property<string>("CountryName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Countrys");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.CourseInterest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("color1")
                        .HasColumnType("text");

                    b.Property<string>("color2")
                        .HasColumnType("text");

                    b.Property<string>("courses")
                        .HasColumnType("text");

                    b.Property<string>("description")
                        .HasColumnType("text");

                    b.Property<string>("features")
                        .HasColumnType("text");

                    b.Property<string>("likes")
                        .HasColumnType("text");

                    b.Property<string>("name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("CourseInterests");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.EducationDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Comments")
                        .HasColumnType("text");

                    b.Property<string>("Grade")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("RewardedDate")
                        .IsRequired()
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("School")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Subject")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("EducationDetails");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.MemberAnalytics", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("CompletionId")
                        .HasColumnType("integer");

                    b.Property<int?>("OwnerId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CompletionId");

                    b.HasIndex("OwnerId");

                    b.HasIndex("UserId");

                    b.ToTable("MemberAnalytics");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.Owner", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<string>("Mail")
                        .HasColumnType("text");

                    b.Property<string>("MiddleName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Owners");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.PersonalityReport", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<float>("Answer")
                        .HasColumnType("real");

                    b.Property<int>("QuizId")
                        .HasColumnType("integer");

                    b.Property<int>("TestNo")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("QuizId");

                    b.HasIndex("UserId");

                    b.ToTable("PersonalityReports");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.Quiz", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Question")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Quizes");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.Request", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsPersonalityTestRequest")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsResumeUploadRequest")
                        .HasColumnType("boolean");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("requests");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.ResumeFile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("FileName")
                        .HasColumnType("text");

                    b.Property<string>("FilePath")
                        .HasColumnType("text");

                    b.Property<DateTime>("UploadDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("ResumeFiles");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("RoleName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.ShareProfileToken", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("ExpirationDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Token")
                        .HasColumnType("text");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("shareProfileToken");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.Shortlist", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("shortlists");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.TextNote", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("SendDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("UserId")
                        .IsRequired()
                        .HasColumnType("integer");

                    b.Property<string>("textNote")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("TextNotes");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AboutMe")
                        .HasColumnType("text");

                    b.Property<int>("CountryId")
                        .HasColumnType("integer");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<string>("MemberType")
                        .HasColumnType("text");

                    b.Property<string>("OrganisationCode")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<string>("ProfilePhoto")
                        .HasColumnType("text");

                    b.Property<int?>("RoleId")
                        .IsRequired()
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CountryId");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.UserCompentencyDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<float[]>("Compentencies")
                        .HasColumnType("real[]");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserCompentencyDetails");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.UserShortlist", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("ShortlistId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ShortlistId");

                    b.HasIndex("UserId");

                    b.ToTable("userShortlists");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.WorkExperience", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsOngoing")
                        .HasColumnType("boolean");

                    b.Property<string>("Role")
                        .HasColumnType("text");

                    b.Property<string>("RoleDescription")
                        .HasColumnType("text");

                    b.Property<DateTime?>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.Property<string>("organisation")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("WorkExperienceDetails");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.Assignment", b =>
                {
                    b.HasOne("PeoplehawkRepositories.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.AudioNote", b =>
                {
                    b.HasOne("PeoplehawkRepositories.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.Chart", b =>
                {
                    b.HasOne("PeoplehawkRepositories.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.Completion", b =>
                {
                    b.HasOne("PeoplehawkRepositories.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.EducationDetail", b =>
                {
                    b.HasOne("PeoplehawkRepositories.Models.User", "user")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("user");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.MemberAnalytics", b =>
                {
                    b.HasOne("PeoplehawkRepositories.Models.Completion", "completion")
                        .WithMany()
                        .HasForeignKey("CompletionId");

                    b.HasOne("PeoplehawkRepositories.Models.Owner", "OwnedBy")
                        .WithMany()
                        .HasForeignKey("OwnerId");

                    b.HasOne("PeoplehawkRepositories.Models.User", "user")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("OwnedBy");

                    b.Navigation("completion");

                    b.Navigation("user");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.PersonalityReport", b =>
                {
                    b.HasOne("PeoplehawkRepositories.Models.Quiz", "quiz")
                        .WithMany()
                        .HasForeignKey("QuizId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PeoplehawkRepositories.Models.User", "user")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("quiz");

                    b.Navigation("user");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.Request", b =>
                {
                    b.HasOne("PeoplehawkRepositories.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.ResumeFile", b =>
                {
                    b.HasOne("PeoplehawkRepositories.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.ShareProfileToken", b =>
                {
                    b.HasOne("PeoplehawkRepositories.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.TextNote", b =>
                {
                    b.HasOne("PeoplehawkRepositories.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.User", b =>
                {
                    b.HasOne("PeoplehawkRepositories.Models.Country", "Country")
                        .WithMany()
                        .HasForeignKey("CountryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PeoplehawkRepositories.Models.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Country");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.UserCompentencyDetail", b =>
                {
                    b.HasOne("PeoplehawkRepositories.Models.User", "user")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("user");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.UserShortlist", b =>
                {
                    b.HasOne("PeoplehawkRepositories.Models.Shortlist", "Shortlists")
                        .WithMany()
                        .HasForeignKey("ShortlistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PeoplehawkRepositories.Models.User", "Users")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Shortlists");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("PeoplehawkRepositories.Models.WorkExperience", b =>
                {
                    b.HasOne("PeoplehawkRepositories.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}
