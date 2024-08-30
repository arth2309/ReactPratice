using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    /// <inheritdoc />
    public partial class updateMemberAnalyticstable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MemberAnalytics_PersonalityReports_personalityReportId",
                table: "MemberAnalytics");

            migrationBuilder.DropIndex(
                name: "IX_MemberAnalytics_personalityReportId",
                table: "MemberAnalytics");

            migrationBuilder.DropColumn(
                name: "personalityReportId",
                table: "MemberAnalytics");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "personalityReportId",
                table: "MemberAnalytics",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_MemberAnalytics_personalityReportId",
                table: "MemberAnalytics",
                column: "personalityReportId");

            migrationBuilder.AddForeignKey(
                name: "FK_MemberAnalytics_PersonalityReports_personalityReportId",
                table: "MemberAnalytics",
                column: "personalityReportId",
                principalTable: "PersonalityReports",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
