using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    /// <inheritdoc />
    public partial class addedClientcolumninMemberAnalytics : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MemberAnalytics_Candidates_CandidateId",
                table: "MemberAnalytics");

            migrationBuilder.RenameColumn(
                name: "CandidateId",
                table: "MemberAnalytics",
                newName: "ClientId");

            migrationBuilder.RenameIndex(
                name: "IX_MemberAnalytics_CandidateId",
                table: "MemberAnalytics",
                newName: "IX_MemberAnalytics_ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_MemberAnalytics_Clients_ClientId",
                table: "MemberAnalytics",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MemberAnalytics_Clients_ClientId",
                table: "MemberAnalytics");

            migrationBuilder.RenameColumn(
                name: "ClientId",
                table: "MemberAnalytics",
                newName: "CandidateId");

            migrationBuilder.RenameIndex(
                name: "IX_MemberAnalytics_ClientId",
                table: "MemberAnalytics",
                newName: "IX_MemberAnalytics_CandidateId");

            migrationBuilder.AddForeignKey(
                name: "FK_MemberAnalytics_Candidates_CandidateId",
                table: "MemberAnalytics",
                column: "CandidateId",
                principalTable: "Candidates",
                principalColumn: "Id");
        }
    }
}
