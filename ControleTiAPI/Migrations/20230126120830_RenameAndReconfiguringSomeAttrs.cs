using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class RenameAndReconfiguringSomeAttrs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "updateAt",
                schema: "ti",
                table: "switches",
                newName: "updatedAt");

            migrationBuilder.RenameColumn(
                name: "updateAt",
                schema: "ti",
                table: "router",
                newName: "updatedAt");

            migrationBuilder.RenameColumn(
                name: "updateAt",
                schema: "ti",
                table: "nobreak",
                newName: "updatedAt");

            migrationBuilder.AlterColumn<double>(
                name: "hdSize",
                schema: "ti",
                table: "dvr",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "updatedAt",
                schema: "ti",
                table: "switches",
                newName: "updateAt");

            migrationBuilder.RenameColumn(
                name: "updatedAt",
                schema: "ti",
                table: "router",
                newName: "updateAt");

            migrationBuilder.RenameColumn(
                name: "updatedAt",
                schema: "ti",
                table: "nobreak",
                newName: "updateAt");

            migrationBuilder.AlterColumn<int>(
                name: "hdSize",
                schema: "ti",
                table: "dvr",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");
        }
    }
}
