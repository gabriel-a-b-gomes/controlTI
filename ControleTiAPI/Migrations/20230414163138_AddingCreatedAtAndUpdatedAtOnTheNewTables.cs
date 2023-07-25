using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddingCreatedAtAndUpdatedAtOnTheNewTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "createdAt",
                schema: "ti",
                table: "serverVM",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "notes",
                schema: "ti",
                table: "serverVM",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "updatedAt",
                schema: "ti",
                table: "serverVM",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "createdAt",
                schema: "ti",
                table: "serverHost",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "updatedAt",
                schema: "ti",
                table: "serverHost",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "createdAt",
                schema: "ti",
                table: "serverFunctionality",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "updatedAt",
                schema: "ti",
                table: "serverFunctionality",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "createdAt",
                schema: "ti",
                table: "serverVM");

            migrationBuilder.DropColumn(
                name: "notes",
                schema: "ti",
                table: "serverVM");

            migrationBuilder.DropColumn(
                name: "updatedAt",
                schema: "ti",
                table: "serverVM");

            migrationBuilder.DropColumn(
                name: "createdAt",
                schema: "ti",
                table: "serverHost");

            migrationBuilder.DropColumn(
                name: "updatedAt",
                schema: "ti",
                table: "serverHost");

            migrationBuilder.DropColumn(
                name: "createdAt",
                schema: "ti",
                table: "serverFunctionality");

            migrationBuilder.DropColumn(
                name: "updatedAt",
                schema: "ti",
                table: "serverFunctionality");
        }
    }
}
