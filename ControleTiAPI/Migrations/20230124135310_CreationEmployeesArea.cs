using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class CreationEmployeesArea : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "department",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    enterprise = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_department", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "employee",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    emailPassword = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    departmentId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employee", x => x.id);
                    table.ForeignKey(
                        name: "FK_employee_department_departmentId",
                        column: x => x.departmentId,
                        principalSchema: "ti",
                        principalTable: "department",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "skypeEmployee",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    skypeUser = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    skypePassword = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    employeeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_skypeEmployee", x => x.id);
                    table.ForeignKey(
                        name: "FK_skypeEmployee_employee_employeeId",
                        column: x => x.employeeId,
                        principalSchema: "ti",
                        principalTable: "employee",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "vpnEmployee",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    vpnUser = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    vpnPassword = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    employeeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vpnEmployee", x => x.id);
                    table.ForeignKey(
                        name: "FK_vpnEmployee_employee_employeeId",
                        column: x => x.employeeId,
                        principalSchema: "ti",
                        principalTable: "employee",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_employee_departmentId",
                table: "employee",
                schema: "ti",
                column: "departmentId");

            migrationBuilder.CreateIndex(
                name: "IX_skypeEmployee_employeeId",
                table: "skypeEmployee",
                schema: "ti",
                column: "employeeId");

            migrationBuilder.CreateIndex(
                name: "IX_vpnEmployee_employeeId",
                table: "vpnEmployee",
                schema: "ti",
                column: "employeeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "skypeEmployee");

            migrationBuilder.DropTable(
                name: "vpnEmployee");

            migrationBuilder.DropTable(
                name: "employee");

            migrationBuilder.DropTable(
                name: "department");
        }
    }
}
