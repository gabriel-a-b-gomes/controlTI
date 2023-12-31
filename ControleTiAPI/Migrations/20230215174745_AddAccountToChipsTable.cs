﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddAccountToChipsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "account",
                schema: "ti",
                table: "chip",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "account",
                schema: "ti",
                table: "chip");
        }
    }
}
