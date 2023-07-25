using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class RemoveAndAddUniqueIndexOfEmployeeContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "VpnUserIndex",
                schema: "ti",
                table: "vpnEmployee");

            migrationBuilder.DropIndex(
                name: "SkypeUserIndex",
                schema: "ti",
                table: "skypeEmployee");

            migrationBuilder.DropIndex(
                name: "EmailEmployeeIndex",
                schema: "ti",
                table: "employee");

            migrationBuilder.AlterColumn<string>(
                name: "alternativeEmailPassword",
                schema: "ti",
                table: "employee",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "alternativeEmail",
                schema: "ti",
                table: "employee",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "UserNameEmployee",
                schema: "ti",
                table: "employee",
                column: "name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "UserNameEmployee",
                schema: "ti",
                table: "employee");

            migrationBuilder.AlterColumn<string>(
                name: "alternativeEmailPassword",
                schema: "ti",
                table: "employee",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "alternativeEmail",
                schema: "ti",
                table: "employee",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "VpnUserIndex",
                schema: "ti",
                table: "vpnEmployee",
                column: "vpnUser",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "SkypeUserIndex",
                schema: "ti",
                table: "skypeEmployee",
                column: "skypeUser",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "EmailEmployeeIndex",
                schema: "ti",
                table: "employee",
                column: "email",
                unique: true);
        }
    }
}
