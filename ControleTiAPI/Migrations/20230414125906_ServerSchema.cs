using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class ServerSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "serverFunctionality",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    description = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_serverFunctionality", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "serverHost",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    code = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    machineBrand = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    machineModel = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    processorModelDescription = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    processorFrequency = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    operationalSystemDescription = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    lastPreventiveDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ticketId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    acquisitionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    status = table.Column<int>(type: "int", nullable: false),
                    assetNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    notes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_serverHost", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ServerFunctionalityServerHost",
                schema: "ti",
                columns: table => new
                {
                    functionalitiesid = table.Column<int>(type: "int", nullable: false),
                    hostsid = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServerFunctionalityServerHost", x => new { x.functionalitiesid, x.hostsid });
                    table.ForeignKey(
                        name: "FK_ServerFunctionalityServerHost_serverFunctionality_functionalitiesid",
                        column: x => x.functionalitiesid,
                        principalSchema: "ti",
                        principalTable: "serverFunctionality",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServerFunctionalityServerHost_serverHost_hostsid",
                        column: x => x.hostsid,
                        principalSchema: "ti",
                        principalTable: "serverHost",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "serverMemory",
                schema: "ti",
                columns: table => new
                {
                    serverHostId = table.Column<int>(type: "int", nullable: false),
                    memoryId = table.Column<int>(type: "int", nullable: false),
                    qtde = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_serverMemory", x => new { x.memoryId, x.serverHostId });
                    table.ForeignKey(
                        name: "FK_serverMemory_memory_memoryId",
                        column: x => x.memoryId,
                        principalSchema: "ti",
                        principalTable: "memory",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_serverMemory_serverHost_serverHostId",
                        column: x => x.serverHostId,
                        principalSchema: "ti",
                        principalTable: "serverHost",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "serverPreventive",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    preventiveDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ticketId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    hostId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_serverPreventive", x => x.id);
                    table.ForeignKey(
                        name: "FK_serverPreventive_serverHost_hostId",
                        column: x => x.hostId,
                        principalSchema: "ti",
                        principalTable: "serverHost",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "serverStorage",
                schema: "ti",
                columns: table => new
                {
                    serverHostId = table.Column<int>(type: "int", nullable: false),
                    storageId = table.Column<int>(type: "int", nullable: false),
                    qtde = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_serverStorage", x => new { x.storageId, x.serverHostId });
                    table.ForeignKey(
                        name: "FK_serverStorage_serverHost_serverHostId",
                        column: x => x.serverHostId,
                        principalSchema: "ti",
                        principalTable: "serverHost",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_serverStorage_storage_storageId",
                        column: x => x.storageId,
                        principalSchema: "ti",
                        principalTable: "storage",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "serverVM",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    code = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    operationalSystem = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    memorySize = table.Column<int>(type: "int", nullable: false),
                    storageSize = table.Column<double>(type: "float", nullable: false),
                    setupDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    status = table.Column<int>(type: "int", nullable: false),
                    serverHostId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_serverVM", x => x.id);
                    table.ForeignKey(
                        name: "FK_serverVM_serverHost_serverHostId",
                        column: x => x.serverHostId,
                        principalSchema: "ti",
                        principalTable: "serverHost",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ServerFunctionalityServerVM",
                schema: "ti",
                columns: table => new
                {
                    functionalitiesid = table.Column<int>(type: "int", nullable: false),
                    virtualMachinesid = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServerFunctionalityServerVM", x => new { x.functionalitiesid, x.virtualMachinesid });
                    table.ForeignKey(
                        name: "FK_ServerFunctionalityServerVM_serverFunctionality_functionalitiesid",
                        column: x => x.functionalitiesid,
                        principalSchema: "ti",
                        principalTable: "serverFunctionality",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServerFunctionalityServerVM_serverVM_virtualMachinesid",
                        column: x => x.virtualMachinesid,
                        principalSchema: "ti",
                        principalTable: "serverVM",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ServerFunctionalityServerHost_hostsid",
                schema: "ti",
                table: "ServerFunctionalityServerHost",
                column: "hostsid");

            migrationBuilder.CreateIndex(
                name: "IX_ServerFunctionalityServerVM_virtualMachinesid",
                schema: "ti",
                table: "ServerFunctionalityServerVM",
                column: "virtualMachinesid");

            migrationBuilder.CreateIndex(
                name: "CodeSrvHostIndex",
                schema: "ti",
                table: "serverHost",
                column: "code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_serverMemory_serverHostId",
                schema: "ti",
                table: "serverMemory",
                column: "serverHostId");

            migrationBuilder.CreateIndex(
                name: "IX_serverPreventive_hostId",
                schema: "ti",
                table: "serverPreventive",
                column: "hostId");

            migrationBuilder.CreateIndex(
                name: "IX_serverStorage_serverHostId",
                schema: "ti",
                table: "serverStorage",
                column: "serverHostId");

            migrationBuilder.CreateIndex(
                name: "CodeVMIndex",
                schema: "ti",
                table: "serverVM",
                column: "code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_serverVM_serverHostId",
                schema: "ti",
                table: "serverVM",
                column: "serverHostId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ServerFunctionalityServerHost",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "ServerFunctionalityServerVM",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "serverMemory",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "serverPreventive",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "serverStorage",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "serverFunctionality",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "serverVM",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "serverHost",
                schema: "ti");
        }
    }
}
