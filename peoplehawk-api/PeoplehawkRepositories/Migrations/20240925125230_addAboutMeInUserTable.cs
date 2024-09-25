using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    /// <inheritdoc />
    public partial class addAboutMeInUserTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AboutMe",
                table: "Users",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AboutMe",
                table: "Users");
        }
    }
}
