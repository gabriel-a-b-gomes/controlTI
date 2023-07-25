using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddingSomeFieldsToLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "code",
                schema: "ti",
                table: "computerLog",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "department",
                schema: "ti",
                table: "computerLog",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "employee",
                schema: "ti",
                table: "computerLog",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "enterprise",
                schema: "ti",
                table: "computerLog",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "code",
                schema: "ti",
                table: "computerLog");

            migrationBuilder.DropColumn(
                name: "department",
                schema: "ti",
                table: "computerLog");

            migrationBuilder.DropColumn(
                name: "employee",
                schema: "ti",
                table: "computerLog");

            migrationBuilder.DropColumn(
                name: "enterprise",
                schema: "ti",
                table: "computerLog");
        }
    }
}
