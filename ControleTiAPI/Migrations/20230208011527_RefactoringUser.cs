using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class RefactoringUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                schema: "ti",
                table: "user");

            migrationBuilder.RenameColumn(
                name: "Name",
                schema: "ti",
                table: "user",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Email",
                schema: "ti",
                table: "user",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "DisplayName",
                schema: "ti",
                table: "user",
                newName: "displayName");

            migrationBuilder.RenameColumn(
                name: "Id",
                schema: "ti",
                table: "user",
                newName: "id");

            migrationBuilder.AddColumn<string>(
                name: "lastPassword",
                schema: "ti",
                table: "user",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "lastPassword",
                schema: "ti",
                table: "user");

            migrationBuilder.RenameColumn(
                name: "name",
                schema: "ti",
                table: "user",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "email",
                schema: "ti",
                table: "user",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "displayName",
                schema: "ti",
                table: "user",
                newName: "DisplayName");

            migrationBuilder.RenameColumn(
                name: "id",
                schema: "ti",
                table: "user",
                newName: "Id");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                schema: "ti",
                table: "user",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }
    }
}
