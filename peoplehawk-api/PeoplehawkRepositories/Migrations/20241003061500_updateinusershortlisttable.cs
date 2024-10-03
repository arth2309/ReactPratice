using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    /// <inheritdoc />
    public partial class updateinusershortlisttable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_userShortlists_Users_User",
                table: "userShortlists");

            migrationBuilder.RenameColumn(
                name: "User",
                table: "userShortlists",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_userShortlists_User",
                table: "userShortlists",
                newName: "IX_userShortlists_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_userShortlists_Users_UserId",
                table: "userShortlists",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_userShortlists_Users_UserId",
                table: "userShortlists");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "userShortlists",
                newName: "User");

            migrationBuilder.RenameIndex(
                name: "IX_userShortlists_UserId",
                table: "userShortlists",
                newName: "IX_userShortlists_User");

            migrationBuilder.AddForeignKey(
                name: "FK_userShortlists_Users_User",
                table: "userShortlists",
                column: "User",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
