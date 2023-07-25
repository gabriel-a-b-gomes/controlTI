using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class CreationOfDevicesCCRN : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_switches",
                schema: "ti",
                table: "switches");

            migrationBuilder.DropPrimaryKey(
                name: "PK_router",
                schema: "ti",
                table: "router");

            migrationBuilder.DropPrimaryKey(
                name: "PK_nobreak",
                schema: "ti",
                table: "nobreak");

            migrationBuilder.DropPrimaryKey(
                name: "PK_dvr",
                schema: "ti",
                table: "dvr");

            migrationBuilder.DropForeignKey(
                name: "FK_employee_department_departmentId",
                schema: "ti",
                table: "employee");

            migrationBuilder.AddForeignKey(
                name: "FK_employee_department_departmentId",
                schema: "ti",
                table: "employee",
                column: "departmentId",
                principalSchema: "ti",
                principalTable: "department",
                principalColumn: "id");

            //migrationBuilder.AlterColumn<int>(
            //    name: "id",
            //    schema: "ti",
            //    table: "switches",
            //    type: "int",
            //    nullable: false,
            //    oldClrType: typeof(int),
            //    oldType: "int")
            //    .Annotation("SqlServer:Identity", "1, 1");

            //migrationBuilder.AlterColumn<int>(
            //    name: "id",
            //    schema: "ti",
            //    table: "router",
            //    type: "int",
            //    nullable: false,
            //    oldClrType: typeof(int),
            //    oldType: "int")
            //    .Annotation("SqlServer:Identity", "1, 1");

            //migrationBuilder.AlterColumn<int>(
            //    name: "id",
            //    schema: "ti",
            //    table: "nobreak",
            //    type: "int",
            //    nullable: false,
            //    oldClrType: typeof(int),
            //    oldType: "int")
            //    .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<DateTime>(
                name: "lastPreventive",
                schema: "ti",
                table: "nobreak",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            //migrationBuilder.AlterColumn<int>(
            //    name: "id",
            //    schema: "ti",
            //    table: "dvr",
            //    type: "int",
            //    nullable: false,
            //    oldClrType: typeof(int),
            //    oldType: "int")
            //    .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<DateTime>(
                name: "lastPreventive",
                schema: "ti",
                table: "dvr",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_switches",
                schema: "ti",
                table: "switches",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_router",
                schema: "ti",
                table: "router",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_nobreak",
                schema: "ti",
                table: "nobreak",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_dvr",
                schema: "ti",
                table: "dvr",
                column: "id");

            migrationBuilder.CreateTable(
                name: "cellPhone",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    model = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    memorySize = table.Column<int>(type: "int", nullable: true),
                    storageSize = table.Column<int>(type: "int", nullable: true),
                    processingUnit = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    operationalSystem = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cellPhone", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "networkNode",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    code = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    switchPort = table.Column<int>(type: "int", nullable: false),
                    patchPanelLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    patchPanelPort = table.Column<int>(type: "int", nullable: true),
                    patchPanelNodeId = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: true),
                    notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    createdAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    updateAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    switchId = table.Column<int>(type: "int", nullable: false),
                    employeeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_networkNode", x => x.id);
                    table.ForeignKey(
                        name: "FK_networkNode_employee_employeeId",
                        column: x => x.employeeId,
                        principalSchema: "ti",
                        principalTable: "employee",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_networkNode_switches_switchId",
                        column: x => x.switchId,
                        principalSchema: "ti",
                        principalTable: "switches",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ramal",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    number = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    model = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    exitNumber = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    isDepartment = table.Column<bool>(type: "bit", nullable: false),
                    deviceIP = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    deviceConfig = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    deviceUser = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    devicePassword = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    assetNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    acquisitionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    createdAt = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "getdate()"),
                    updateAt = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "getdate()"),
                    departmentId = table.Column<int>(type: "int", nullable: false),
                    employeeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ramal", x => x.id);
                    table.ForeignKey(
                        name: "FK_ramal_department_departmentId",
                        column: x => x.departmentId,
                        principalSchema: "ti",
                        principalTable: "department",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ramal_employee_employeeId",
                        column: x => x.employeeId,
                        principalSchema: "ti",
                        principalTable: "employee",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "chip",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    number = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    type = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    acctualICCID = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    assetNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    acquisitionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    createdAt = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "getdate()"),
                    updateAt = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "getdate()"),
                    departmentId = table.Column<int>(type: "int", nullable: true),
                    employeeId = table.Column<int>(type: "int", nullable: true),
                    cellphoneId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_chip", x => x.id);
                    table.ForeignKey(
                        name: "FK_chip_cellPhone_cellphoneId",
                        column: x => x.cellphoneId,
                        principalSchema: "ti",
                        principalTable: "cellPhone",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_chip_department_departmentId",
                        column: x => x.departmentId,
                        principalSchema: "ti",
                        principalTable: "department",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_chip_employee_employeeId",
                        column: x => x.employeeId,
                        principalSchema: "ti",
                        principalTable: "employee",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ChipNumberIndex",
                schema: "ti",
                table: "chip",
                column: "number",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_chip_cellphoneId",
                schema: "ti",
                table: "chip",
                column: "cellphoneId");

            migrationBuilder.CreateIndex(
                name: "IX_chip_departmentId",
                schema: "ti",
                table: "chip",
                column: "departmentId");

            migrationBuilder.CreateIndex(
                name: "IX_chip_employeeId",
                schema: "ti",
                table: "chip",
                column: "employeeId");

            migrationBuilder.CreateIndex(
                name: "IX_networkNode_employeeId",
                schema: "ti",
                table: "networkNode",
                column: "employeeId");

            migrationBuilder.CreateIndex(
                name: "IX_networkNode_switchId",
                schema: "ti",
                table: "networkNode",
                column: "switchId");

            migrationBuilder.CreateIndex(
                name: "IX_ramal_departmentId",
                schema: "ti",
                table: "ramal",
                column: "departmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ramal_employeeId",
                schema: "ti",
                table: "ramal",
                column: "employeeId");

            migrationBuilder.CreateIndex(
                name: "RamalNumberIndex",
                schema: "ti",
                table: "ramal",
                column: "number",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "chip",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "networkNode",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "ramal",
                schema: "ti");

            migrationBuilder.DropTable(
                name: "cellPhone",
                schema: "ti");

            migrationBuilder.DropPrimaryKey(
                name: "PK_switches",
                schema: "ti",
                table: "switches");

            migrationBuilder.DropPrimaryKey(
                name: "PK_router",
                schema: "ti",
                table: "router");

            migrationBuilder.DropPrimaryKey(
                name: "PK_nobreak",
                schema: "ti",
                table: "nobreak");

            migrationBuilder.DropPrimaryKey(
                name: "PK_dvr",
                schema: "ti",
                table: "dvr");

            migrationBuilder.DropColumn(
                name: "lastPreventive",
                schema: "ti",
                table: "nobreak");

            migrationBuilder.DropColumn(
                name: "lastPreventive",
                schema: "ti",
                table: "dvr");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                schema: "ti",
                table: "switches",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                schema: "ti",
                table: "router",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                schema: "ti",
                table: "nobreak",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                schema: "ti",
                table: "dvr",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_switches",
                schema: "ti",
                table: "switches",
                columns: new[] { "id", "code" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_router",
                schema: "ti",
                table: "router",
                columns: new[] { "id", "code" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_nobreak",
                schema: "ti",
                table: "nobreak",
                columns: new[] { "id", "code" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_dvr",
                schema: "ti",
                table: "dvr",
                columns: new[] { "id", "code" });
        }
    }
}
