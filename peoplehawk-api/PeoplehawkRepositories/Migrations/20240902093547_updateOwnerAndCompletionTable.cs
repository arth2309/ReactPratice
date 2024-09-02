using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    /// <inheritdoc />
    public partial class updateOwnerAndCompletionTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompletionId",
                table: "MemberAnalytics",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OwnerId",
                table: "MemberAnalytics",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Completions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsPersonalityQuizGiven = table.Column<bool>(type: "boolean", nullable: false),
                    IsGames = table.Column<bool>(type: "boolean", nullable: false),
                    IsVideoInterview = table.Column<bool>(type: "boolean", nullable: false),
                    IsCVOptimized = table.Column<bool>(type: "boolean", nullable: false),
                    IsCompentencyQuizGiven = table.Column<bool>(type: "boolean", nullable: false),
                    IsDocumentGiven = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Completions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Owners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: true),
                    MiddleName = table.Column<string>(type: "text", nullable: true),
                    LastName = table.Column<string>(type: "text", nullable: true),
                    Mail = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Owners", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MemberAnalytics_CompletionId",
                table: "MemberAnalytics",
                column: "CompletionId");

            migrationBuilder.CreateIndex(
                name: "IX_MemberAnalytics_OwnerId",
                table: "MemberAnalytics",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_MemberAnalytics_Completions_CompletionId",
                table: "MemberAnalytics",
                column: "CompletionId",
                principalTable: "Completions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MemberAnalytics_Owners_OwnerId",
                table: "MemberAnalytics",
                column: "OwnerId",
                principalTable: "Owners",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MemberAnalytics_Completions_CompletionId",
                table: "MemberAnalytics");

            migrationBuilder.DropForeignKey(
                name: "FK_MemberAnalytics_Owners_OwnerId",
                table: "MemberAnalytics");

            migrationBuilder.DropTable(
                name: "Completions");

            migrationBuilder.DropTable(
                name: "Owners");

            migrationBuilder.DropIndex(
                name: "IX_MemberAnalytics_CompletionId",
                table: "MemberAnalytics");

            migrationBuilder.DropIndex(
                name: "IX_MemberAnalytics_OwnerId",
                table: "MemberAnalytics");

            migrationBuilder.DropColumn(
                name: "CompletionId",
                table: "MemberAnalytics");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "MemberAnalytics");
        }
    }
}
