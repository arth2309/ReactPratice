using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    /// <inheritdoc />
    public partial class addTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Charts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    A = table.Column<int>(type: "integer", nullable: false),
                    C = table.Column<int>(type: "integer", nullable: false),
                    E = table.Column<int>(type: "integer", nullable: false),
                    I = table.Column<int>(type: "integer", nullable: false),
                    R = table.Column<int>(type: "integer", nullable: false),
                    S = table.Column<int>(type: "integer", nullable: false),
                    career_code = table.Column<string>(type: "text", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Charts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CourseInterests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    features = table.Column<string>(type: "text", nullable: true),
                    likes = table.Column<string>(type: "text", nullable: true),
                    courses = table.Column<string>(type: "text", nullable: true),
                    color1 = table.Column<string>(type: "text", nullable: true),
                    color2 = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseInterests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ResumeFiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    FileName = table.Column<string>(type: "text", nullable: true),
                    FilePath = table.Column<string>(type: "text", nullable: true),
                    UploadDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResumeFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResumeFiles_Charts_UserId",
                        column: x => x.UserId,
                        principalTable: "Charts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ResumeFiles_UserId",
                table: "ResumeFiles",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseInterests");

            migrationBuilder.DropTable(
                name: "ResumeFiles");

            migrationBuilder.DropTable(
                name: "Charts");
        }
    }
}
