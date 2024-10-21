using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    /// <inheritdoc />
    public partial class removeClientIdCandidateTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Candidates_Clients_ClientId",
                table: "Candidates");

            migrationBuilder.DropIndex(
                name: "IX_Candidates_ClientId",
                table: "Candidates");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Candidates");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "Candidates",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_ClientId",
                table: "Candidates",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Candidates_Clients_ClientId",
                table: "Candidates",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
