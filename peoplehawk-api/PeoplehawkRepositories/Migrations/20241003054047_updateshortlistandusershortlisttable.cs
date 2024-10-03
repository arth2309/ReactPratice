using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    /// <inheritdoc />
    public partial class updateshortlistandusershortlisttable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "shortlists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_shortlists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "userShortlists",
                columns: table => new
                {
                    ShortlistId = table.Column<int>(type: "integer", nullable: false),
                    User = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK_userShortlists_Users_User",
                        column: x => x.User,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_userShortlists_shortlists_ShortlistId",
                        column: x => x.ShortlistId,
                        principalTable: "shortlists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_userShortlists_ShortlistId",
                table: "userShortlists",
                column: "ShortlistId");

            migrationBuilder.CreateIndex(
                name: "IX_userShortlists_User",
                table: "userShortlists",
                column: "User");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "userShortlists");

            migrationBuilder.DropTable(
                name: "shortlists");
        }
    }
}
