using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeoplehawkRepositories.Migrations
{
    /// <inheritdoc />
    public partial class updatingPersonalityReporttable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PersonalityReports_Quizes_quizId",
                table: "PersonalityReports");

            migrationBuilder.DropColumn(
                name: "QuestionId",
                table: "PersonalityReports");

            migrationBuilder.RenameColumn(
                name: "quizId",
                table: "PersonalityReports",
                newName: "QuizId");

            migrationBuilder.RenameIndex(
                name: "IX_PersonalityReports_quizId",
                table: "PersonalityReports",
                newName: "IX_PersonalityReports_QuizId");

            migrationBuilder.AddForeignKey(
                name: "FK_PersonalityReports_Quizes_QuizId",
                table: "PersonalityReports",
                column: "QuizId",
                principalTable: "Quizes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PersonalityReports_Quizes_QuizId",
                table: "PersonalityReports");

            migrationBuilder.RenameColumn(
                name: "QuizId",
                table: "PersonalityReports",
                newName: "quizId");

            migrationBuilder.RenameIndex(
                name: "IX_PersonalityReports_QuizId",
                table: "PersonalityReports",
                newName: "IX_PersonalityReports_quizId");

            migrationBuilder.AddColumn<int>(
                name: "QuestionId",
                table: "PersonalityReports",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonalityReports_Quizes_quizId",
                table: "PersonalityReports",
                column: "quizId",
                principalTable: "Quizes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
