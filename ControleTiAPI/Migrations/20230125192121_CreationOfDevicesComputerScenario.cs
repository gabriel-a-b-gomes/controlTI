using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class CreationOfDevicesComputerScenario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "storageSize",
                schema: "ti",
                table: "cellPhone",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "processingUnit",
                schema: "ti",
                table: "cellPhone",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "operationalSystem",
                schema: "ti",
                table: "cellPhone",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "model",
                schema: "ti",
                table: "cellPhone",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "memorySize",
                schema: "ti",
                table: "cellPhone",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateTable(
                name: "ComputerProfile",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    rankOfProcessingUnit = table.Column<int>(type: "int", nullable: false),
                    memoryMinSize = table.Column<int>(type: "int", nullable: false),
                    storageMinSize = table.Column<int>(type: "int", nullable: false),
                    storageType = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    rankOfOperationSystem = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComputerProfile", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "memory",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    model = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    memoryPentSize = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_memory", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "processingUnit",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    model = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    generation = table.Column<int>(type: "int", nullable: false),
                    frequency = table.Column<double>(type: "float", nullable: false),
                    rankProcessingUnit = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_processingUnit", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "storage",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    brand = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    storageSize = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_storage", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "computer",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    code = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    computerType = table.Column<int>(type: "int", nullable: false),
                    memorySize = table.Column<int>(type: "int", nullable: false),
                    storageSize = table.Column<int>(type: "int", nullable: false),
                    operationalSystem = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    rankOperationalSystem = table.Column<int>(type: "int", nullable: false),
                    isGood = table.Column<bool>(type: "bit", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    assetNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    acquisitionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    lastPreventiveDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    createdAt = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "getdate()"),
                    departmentId = table.Column<int>(type: "int", nullable: true),
                    employeeId = table.Column<int>(type: "int", nullable: true),
                    profileId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_computer", x => x.id);
                    table.ForeignKey(
                        name: "FK_computer_ComputerProfile_profileId",
                        column: x => x.profileId,
                        principalSchema: "ti",
                        principalTable: "ComputerProfile",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_computer_department_departmentId",
                        column: x => x.departmentId,
                        principalSchema: "ti",
                        principalTable: "department",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_computer_employee_employeeId",
                        column: x => x.employeeId,
                        principalSchema: "ti",
                        principalTable: "employee",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "computerLog",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    processingUnit = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    operationalSystem = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    memorySize = table.Column<int>(type: "int", nullable: false),
                    storageSize = table.Column<int>(type: "int", nullable: false),
                    storageType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    isGood = table.Column<bool>(type: "bit", nullable: false),
                    updateAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    computerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_computerLog", x => x.id);
                    table.ForeignKey(
                        name: "FK_computerLog_computer_computerId",
                        column: x => x.computerId,
                        principalSchema: "ti",
                        principalTable: "computer",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "computerMemory",
                schema: "ti",
                columns: table => new
                {
                    computerId = table.Column<int>(type: "int", nullable: false),
                    memoryId = table.Column<int>(type: "int", nullable: false),
                    qtde = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_computerMemory", x => new { x.memoryId, x.computerId });
                    table.ForeignKey(
                        name: "FK_computerMemory_computer_computerId",
                        column: x => x.computerId,
                        principalSchema: "ti",
                        principalTable: "computer",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_computerMemory_memory_memoryId",
                        column: x => x.memoryId,
                        principalSchema: "ti",
                        principalTable: "memory",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "computerProcessingUnit",
                schema: "ti",
                columns: table => new
                {
                    computerId = table.Column<int>(type: "int", nullable: false),
                    processingUnitId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_computerProcessingUnit", x => new { x.computerId, x.processingUnitId });
                    table.ForeignKey(
                        name: "FK_computerProcessingUnit_computer_computerId",
                        column: x => x.computerId,
                        principalSchema: "ti",
                        principalTable: "computer",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_computerProcessingUnit_processingUnit_processingUnitId",
                        column: x => x.processingUnitId,
                        principalSchema: "ti",
                        principalTable: "processingUnit",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "computerStorage",
                schema: "ti",
                columns: table => new
                {
                    computerId = table.Column<int>(type: "int", nullable: false),
                    storageId = table.Column<int>(type: "int", nullable: false),
                    qtde = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_computerStorage", x => new { x.storageId, x.computerId });
                    table.ForeignKey(
                        name: "FK_computerStorage_computer_computerId",
                        column: x => x.computerId,
                        principalSchema: "ti",
                        principalTable: "computer",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_computerStorage_storage_storageId",
                        column: x => x.storageId,
                        principalSchema: "ti",
                        principalTable: "storage",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "VpnUserIndex",
                schema: "ti",
                table: "vpnEmployee",
                column: "vpnUser",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "CodeSwitchIndex",
                schema: "ti",
                table: "switches",
                column: "code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "SkypeUserIndex",
                schema: "ti",
                table: "skypeEmployee",
                column: "skypeUser",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "CodeRouterIndex",
                schema: "ti",
                table: "router",
                column: "code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "CodeNobreakIndex",
                schema: "ti",
                table: "nobreak",
                column: "code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "CodeNetworkNodeIndex",
                schema: "ti",
                table: "networkNode",
                column: "code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "EmailEmployeeIndex",
                schema: "ti",
                table: "employee",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "CodeDVRIndex",
                schema: "ti",
                table: "dvr",
                column: "code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "CodeComputerIndex",
                schema: "ti",
                table: "computer",
                column: "code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_computer_departmentId",
                schema: "ti",
                table: "computer",
                column: "departmentId");

            migrationBuilder.CreateIndex(
                name: "IX_computer_employeeId",
                schema: "ti",
                table: "computer",
                column: "employeeId");

            migrationBuilder.CreateIndex(
                name: "IX_computer_profileId",
                schema: "ti",
                table: "computer",
                column: "profileId");

            migrationBuilder.CreateIndex(
                name: "IX_computerLog_computerId",
                schema: "ti",
                table: "computerLog",
                column: "computerId");

            migrationBuilder.CreateIndex(
                name: "IX_computerMemory_computerId",
                schema: "ti",
                table: "computerMemory",
                column: "computerId");

            migrationBuilder.CreateIndex(
                name: "IX_computerProcessingUnit_processingUnitId",
                schema: "ti",
                table: "computerProcessingUnit",
                column: "processingUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_computerStorage_computerId",
                schema: "ti",
                table: "computerStorage",
                column: "computerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "computerLog",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "computerMemory",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "computerProcessingUnit",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "computerStorage",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "memory",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "processingUnit",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "computer",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "storage",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "ComputerProfile",
                schema: "ti");

            migrationBuilder.DropIndex(
                name: "VpnUserIndex",
                schema: "ti",
                table: "vpnEmployee");

            migrationBuilder.DropIndex(
                name: "CodeSwitchIndex",
                schema: "ti",
                table: "switches");

            migrationBuilder.DropIndex(
                name: "SkypeUserIndex",
                schema: "ti",
                table: "skypeEmployee");

            migrationBuilder.DropIndex(
                name: "CodeRouterIndex",
                schema: "ti",
                table: "router");

            migrationBuilder.DropIndex(
                name: "CodeNobreakIndex",
                schema: "ti",
                table: "nobreak");

            migrationBuilder.DropIndex(
                name: "CodeNetworkNodeIndex",
                schema: "ti",
                table: "networkNode");

            migrationBuilder.DropIndex(
                name: "EmailEmployeeIndex",
                schema: "ti",
                table: "employee");

            migrationBuilder.DropIndex(
                name: "CodeDVRIndex",
                schema: "ti",
                table: "dvr");

            migrationBuilder.AlterColumn<int>(
                name: "storageSize",
                schema: "ti",
                table: "cellPhone",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "processingUnit",
                schema: "ti",
                table: "cellPhone",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "operationalSystem",
                schema: "ti",
                table: "cellPhone",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "model",
                schema: "ti",
                table: "cellPhone",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "memorySize",
                schema: "ti",
                table: "cellPhone",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
