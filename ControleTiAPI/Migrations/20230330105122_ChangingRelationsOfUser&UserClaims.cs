using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class ChangingRelationsOfUserUserClaims : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_userClaims_userId",
                schema: "ti",
                table: "userClaims");

            migrationBuilder.CreateIndex(
                name: "IX_userClaims_userId",
                schema: "ti",
                table: "userClaims",
                column: "userId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_userClaims_userId",
                schema: "ti",
                table: "userClaims");

            migrationBuilder.CreateIndex(
                name: "IX_userClaims_userId",
                schema: "ti",
                table: "userClaims",
                column: "userId",
                unique: true);
        }
    }
}
