using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    /// <inheritdoc />
    public partial class addMemberAnalyticstable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MemberAnalytics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    resumeFileId = table.Column<int>(type: "integer", nullable: false),
                    personalityReportId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MemberAnalytics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MemberAnalytics_PersonalityReports_personalityReportId",
                        column: x => x.personalityReportId,
                        principalTable: "PersonalityReports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MemberAnalytics_ResumeFiles_resumeFileId",
                        column: x => x.resumeFileId,
                        principalTable: "ResumeFiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MemberAnalytics_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MemberAnalytics_personalityReportId",
                table: "MemberAnalytics",
                column: "personalityReportId");

            migrationBuilder.CreateIndex(
                name: "IX_MemberAnalytics_resumeFileId",
                table: "MemberAnalytics",
                column: "resumeFileId");

            migrationBuilder.CreateIndex(
                name: "IX_MemberAnalytics_UserId",
                table: "MemberAnalytics",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MemberAnalytics");
        }
    }
}
