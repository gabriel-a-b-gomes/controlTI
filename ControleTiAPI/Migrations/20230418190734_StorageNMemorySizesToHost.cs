using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class StorageNMemorySizesToHost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "memorySize",
                schema: "ti",
                table: "serverHost",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "storageSize",
                schema: "ti",
                table: "serverHost",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "memorySize",
                schema: "ti",
                table: "serverHost");

            migrationBuilder.DropColumn(
                name: "storageSize",
                schema: "ti",
                table: "serverHost");
        }
    }
}
