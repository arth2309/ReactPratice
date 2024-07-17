using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace peoplehawk_api.Migrations
{
    /// <inheritdoc />
    public partial class addforeignkey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "ResumeFiles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ResumeFiles_UserId",
                table: "ResumeFiles",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ResumeFiles_Charts_UserId",
                table: "ResumeFiles",
                column: "UserId",
                principalTable: "Charts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResumeFiles_Charts_UserId",
                table: "ResumeFiles");

            migrationBuilder.DropIndex(
                name: "IX_ResumeFiles_UserId",
                table: "ResumeFiles");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ResumeFiles");
        }
    }
}
