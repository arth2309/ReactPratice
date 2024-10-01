using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    /// <inheritdoc />
    public partial class updateincompletiontable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Completions",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Completions_UserId",
                table: "Completions",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Completions_Users_UserId",
                table: "Completions",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Completions_Users_UserId",
                table: "Completions");

            migrationBuilder.DropIndex(
                name: "IX_Completions_UserId",
                table: "Completions");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Completions");
        }
    }
}
