using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddPreventivesTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ticketId",
                schema: "ti",
                table: "nobreak",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ticketId",
                schema: "ti",
                table: "dvr",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ticketId",
                schema: "ti",
                table: "computer",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "computerPreventive",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    preventiveDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ticketId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    computerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_computerPreventive", x => x.id);
                    table.ForeignKey(
                        name: "FK_computerPreventive_computer_computerId",
                        column: x => x.computerId,
                        principalSchema: "ti",
                        principalTable: "computer",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "dvrPreventive",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    preventiveDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ticketId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    dvrId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dvrPreventive", x => x.id);
                    table.ForeignKey(
                        name: "FK_dvrPreventive_dvr_dvrId",
                        column: x => x.dvrId,
                        principalSchema: "ti",
                        principalTable: "dvr",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "nobreakPreventive",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    preventiveDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ticketId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    nobreakId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_nobreakPreventive", x => x.id);
                    table.ForeignKey(
                        name: "FK_nobreakPreventive_nobreak_nobreakId",
                        column: x => x.nobreakId,
                        principalSchema: "ti",
                        principalTable: "nobreak",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_computerPreventive_computerId",
                schema: "ti",
                table: "computerPreventive",
                column: "computerId");

            migrationBuilder.CreateIndex(
                name: "IX_dvrPreventive_dvrId",
                schema: "ti",
                table: "dvrPreventive",
                column: "dvrId");

            migrationBuilder.CreateIndex(
                name: "IX_nobreakPreventive_nobreakId",
                schema: "ti",
                table: "nobreakPreventive",
                column: "nobreakId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "computerPreventive",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "dvrPreventive",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "nobreakPreventive",
                schema: "ti");

            migrationBuilder.DropColumn(
                name: "ticketId",
                schema: "ti",
                table: "nobreak");

            migrationBuilder.DropColumn(
                name: "ticketId",
                schema: "ti",
                table: "dvr");

            migrationBuilder.DropColumn(
                name: "ticketId",
                schema: "ti",
                table: "computer");
        }
    }
}
