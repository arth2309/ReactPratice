using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    /// <inheritdoc />
    public partial class addedCandidatecolumninMemberAnalytics : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CandidateId",
                table: "MemberAnalytics",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MemberAnalytics_CandidateId",
                table: "MemberAnalytics",
                column: "CandidateId");

            migrationBuilder.AddForeignKey(
                name: "FK_MemberAnalytics_Candidates_CandidateId",
                table: "MemberAnalytics",
                column: "CandidateId",
                principalTable: "Candidates",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MemberAnalytics_Candidates_CandidateId",
                table: "MemberAnalytics");

            migrationBuilder.DropIndex(
                name: "IX_MemberAnalytics_CandidateId",
                table: "MemberAnalytics");

            migrationBuilder.DropColumn(
                name: "CandidateId",
                table: "MemberAnalytics");
        }
    }
}
