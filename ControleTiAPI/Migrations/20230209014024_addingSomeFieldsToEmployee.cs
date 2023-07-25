using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class addingSomeFieldsToEmployee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_vpnEmployee_employeeId",
                schema: "ti",
                table: "vpnEmployee");

            migrationBuilder.DropIndex(
                name: "IX_skypeEmployee_employeeId",
                schema: "ti",
                table: "skypeEmployee");

            migrationBuilder.AddColumn<string>(
                name: "alternativeEmail",
                schema: "ti",
                table: "employee",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "alternativeEmailPassword",
                schema: "ti",
                table: "employee",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "createdAt",
                schema: "ti",
                table: "employee",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "displayName",
                schema: "ti",
                table: "employee",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "ingressDate",
                schema: "ti",
                table: "employee",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "notes",
                schema: "ti",
                table: "employee",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "status",
                schema: "ti",
                table: "employee",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "updatedAt",
                schema: "ti",
                table: "employee",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_vpnEmployee_employeeId",
                schema: "ti",
                table: "vpnEmployee",
                column: "employeeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_skypeEmployee_employeeId",
                schema: "ti",
                table: "skypeEmployee",
                column: "employeeId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_vpnEmployee_employeeId",
                schema: "ti",
                table: "vpnEmployee");

            migrationBuilder.DropIndex(
                name: "IX_skypeEmployee_employeeId",
                schema: "ti",
                table: "skypeEmployee");

            migrationBuilder.DropColumn(
                name: "alternativeEmail",
                schema: "ti",
                table: "employee");

            migrationBuilder.DropColumn(
                name: "alternativeEmailPassword",
                schema: "ti",
                table: "employee");

            migrationBuilder.DropColumn(
                name: "createdAt",
                schema: "ti",
                table: "employee");

            migrationBuilder.DropColumn(
                name: "displayName",
                schema: "ti",
                table: "employee");

            migrationBuilder.DropColumn(
                name: "ingressDate",
                schema: "ti",
                table: "employee");

            migrationBuilder.DropColumn(
                name: "notes",
                schema: "ti",
                table: "employee");

            migrationBuilder.DropColumn(
                name: "status",
                schema: "ti",
                table: "employee");

            migrationBuilder.DropColumn(
                name: "updatedAt",
                schema: "ti",
                table: "employee");

            migrationBuilder.CreateIndex(
                name: "IX_vpnEmployee_employeeId",
                schema: "ti",
                table: "vpnEmployee",
                column: "employeeId");

            migrationBuilder.CreateIndex(
                name: "IX_skypeEmployee_employeeId",
                schema: "ti",
                table: "skypeEmployee",
                column: "employeeId");
        }
    }
}
