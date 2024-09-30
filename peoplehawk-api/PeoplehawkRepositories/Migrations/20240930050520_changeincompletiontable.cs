using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    /// <inheritdoc />
    public partial class changeincompletiontable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.RenameColumn(
                name: "SimpleCV",
                table: "Completions",
                newName: "IsCVUploaded");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsCVUploaded",
                table: "Completions",
                newName: "SimpleCV");

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
        }
    }
}
