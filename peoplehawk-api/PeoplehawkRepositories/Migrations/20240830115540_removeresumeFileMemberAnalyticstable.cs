using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    /// <inheritdoc />
    public partial class removeresumeFileMemberAnalyticstable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MemberAnalytics_ResumeFiles_resumeFileId",
                table: "MemberAnalytics");

            migrationBuilder.DropIndex(
                name: "IX_MemberAnalytics_resumeFileId",
                table: "MemberAnalytics");

            migrationBuilder.DropColumn(
                name: "resumeFileId",
                table: "MemberAnalytics");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "resumeFileId",
                table: "MemberAnalytics",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_MemberAnalytics_resumeFileId",
                table: "MemberAnalytics",
                column: "resumeFileId");

            migrationBuilder.AddForeignKey(
                name: "FK_MemberAnalytics_ResumeFiles_resumeFileId",
                table: "MemberAnalytics",
                column: "resumeFileId",
                principalTable: "ResumeFiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
