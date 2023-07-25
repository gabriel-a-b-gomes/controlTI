using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class refactoringSomePrintersFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "printA3",
                schema: "ti",
                table: "printer");

            migrationBuilder.DropColumn(
                name: "printColored",
                schema: "ti",
                table: "printer");

            migrationBuilder.RenameColumn(
                name: "tonner",
                schema: "ti",
                table: "printer",
                newName: "supplies");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "supplies",
                schema: "ti",
                table: "printer",
                newName: "tonner");

            migrationBuilder.AddColumn<bool>(
                name: "printA3",
                schema: "ti",
                table: "printer",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "printColored",
                schema: "ti",
                table: "printer",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
