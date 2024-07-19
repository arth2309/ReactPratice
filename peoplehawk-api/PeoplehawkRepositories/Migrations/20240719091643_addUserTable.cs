using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    /// <inheritdoc />
    public partial class addUserTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResumeFiles_Charts_UserId",
                table: "ResumeFiles");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Charts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>(type: "text", nullable: true),
                    Password = table.Column<string>(type: "text", nullable: true),
                    FirstName = table.Column<string>(type: "text", nullable: true),
                    LastName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Charts_UserId",
                table: "Charts",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Charts_Users_UserId",
                table: "Charts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ResumeFiles_Users_UserId",
                table: "ResumeFiles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Charts_Users_UserId",
                table: "Charts");

            migrationBuilder.DropForeignKey(
                name: "FK_ResumeFiles_Users_UserId",
                table: "ResumeFiles");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Charts_UserId",
                table: "Charts");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Charts");

            migrationBuilder.AddForeignKey(
                name: "FK_ResumeFiles_Charts_UserId",
                table: "ResumeFiles",
                column: "UserId",
                principalTable: "Charts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
