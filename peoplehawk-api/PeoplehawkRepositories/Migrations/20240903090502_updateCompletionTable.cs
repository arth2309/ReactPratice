using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    /// <inheritdoc />
    public partial class updateCompletionTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "InfographicCV",
                table: "Completions",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "MemberCV",
                table: "Completions",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PeopleHawkCV",
                table: "Completions",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "SimpleCV",
                table: "Completions",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InfographicCV",
                table: "Completions");

            migrationBuilder.DropColumn(
                name: "MemberCV",
                table: "Completions");

            migrationBuilder.DropColumn(
                name: "PeopleHawkCV",
                table: "Completions");

            migrationBuilder.DropColumn(
                name: "SimpleCV",
                table: "Completions");
        }
    }
}
