using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class CreationOfDevicesDNRS : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "ti");

            migrationBuilder.RenameTable(
                name: "user",
                newName: "user",
                newSchema: "ti");

            migrationBuilder.CreateTable(
                name: "dvr",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    code = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    brand = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    model = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    qtdeChannels = table.Column<int>(type: "int", nullable: false),
                    hdSize = table.Column<int>(type: "int", nullable: false),
                    activeCams = table.Column<int>(type: "int", nullable: false),
                    dvrIP = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    dvrPort = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    dvrUser = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    dvrPassword = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    assetNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    acquisitionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    createdAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    updatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dvr", x => new { x.id, x.code });
                });

            migrationBuilder.CreateTable(
                name: "nobreak",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    code = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    brand = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    model = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    qtdeVA = table.Column<int>(type: "int", nullable: false),
                    isSenoidal = table.Column<bool>(type: "bit", nullable: false),
                    typeOfUse = table.Column<int>(type: "int", nullable: true),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    assetNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    acquisitionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    createdAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    updateAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_nobreak", x => new { x.id, x.code });
                });

            migrationBuilder.CreateTable(
                name: "router",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    code = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    brand = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    routerIP = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    routerSSID = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    routerMAC = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    routerUser = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    routerPassword = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    assetNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    acquisitionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    createdAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    updateAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_router", x => new { x.id, x.code });
                });

            migrationBuilder.CreateTable(
                name: "switches",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    code = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    brand = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    switchIP = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    qtdePorts = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    switchMAC = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    switchUser = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    switchPassword = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    assetNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    acquisitionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    createdAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    updateAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_switches", x => new { x.id, x.code });
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "dvr",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "nobreak",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "router",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "switches",
                schema: "ti");

            migrationBuilder.RenameTable(
                name: "vpnEmployee",
                schema: "ti",
                newName: "vpnEmployee");

            migrationBuilder.RenameTable(
                name: "user",
                schema: "ti",
                newName: "user");

            migrationBuilder.RenameTable(
                name: "skypeEmployee",
                schema: "ti",
                newName: "skypeEmployee");

            migrationBuilder.RenameTable(
                name: "employee",
                schema: "ti",
                newName: "employee");

            migrationBuilder.RenameTable(
                name: "department",
                schema: "ti",
                newName: "department");
        }
    }
}
