using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    /// <inheritdoc />
    public partial class addednullablecreatedByinShortlisttable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "shortlists",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_shortlists_CreatedBy",
                table: "shortlists",
                column: "CreatedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_shortlists_Users_CreatedBy",
                table: "shortlists",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_shortlists_Users_CreatedBy",
                table: "shortlists");

            migrationBuilder.DropIndex(
                name: "IX_shortlists_CreatedBy",
                table: "shortlists");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "shortlists");
        }
    }
}
