using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class NtoNRelashionsServerFunctionalities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ServerFunctionalityServerHost",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "ServerFunctionalityServerVM",
                schema: "ti");

            migrationBuilder.CreateTable(
                name: "HostFuncionalities",
                schema: "ti",
                columns: table => new
                {
                    hostId = table.Column<int>(type: "int", nullable: false),
                    functionalityId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HostFuncionalities", x => new { x.hostId, x.functionalityId });
                    table.ForeignKey(
                        name: "FK_HostFuncionalities_serverFunctionality_functionalityId",
                        column: x => x.functionalityId,
                        principalSchema: "ti",
                        principalTable: "serverFunctionality",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HostFuncionalities_serverHost_hostId",
                        column: x => x.hostId,
                        principalSchema: "ti",
                        principalTable: "serverHost",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VMFunctionalities",
                schema: "ti",
                columns: table => new
                {
                    vmId = table.Column<int>(type: "int", nullable: false),
                    functionalityId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VMFunctionalities", x => new { x.vmId, x.functionalityId });
                    table.ForeignKey(
                        name: "FK_VMFunctionalities_serverFunctionality_functionalityId",
                        column: x => x.functionalityId,
                        principalSchema: "ti",
                        principalTable: "serverFunctionality",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VMFunctionalities_serverVM_vmId",
                        column: x => x.vmId,
                        principalSchema: "ti",
                        principalTable: "serverVM",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HostFuncionalities_functionalityId",
                schema: "ti",
                table: "HostFuncionalities",
                column: "functionalityId");

            migrationBuilder.CreateIndex(
                name: "IX_VMFunctionalities_functionalityId",
                schema: "ti",
                table: "VMFunctionalities",
                column: "functionalityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HostFuncionalities",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "VMFunctionalities",
                schema: "ti");

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
        }
    }
}
