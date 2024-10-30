using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    /// <inheritdoc />
    public partial class addedIsFavouritecolumnInshortlisttable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsFavourite",
                table: "shortlists",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFavourite",
                table: "shortlists");
        }
    }
}
