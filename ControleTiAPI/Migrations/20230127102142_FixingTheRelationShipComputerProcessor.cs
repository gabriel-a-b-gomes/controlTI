using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class FixingTheRelationShipComputerProcessor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "computerProcessingUnit",
                schema: "ti");

            migrationBuilder.RenameColumn(
                name: "updateAt",
                schema: "ti",
                table: "computerLog",
                newName: "updatedAt");

            migrationBuilder.AddColumn<int>(
                name: "processorId",
                schema: "ti",
                table: "computer",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_computer_processorId",
                schema: "ti",
                table: "computer",
                column: "processorId");

            migrationBuilder.AddForeignKey(
                name: "FK_computer_processingUnit_processorId",
                schema: "ti",
                table: "computer",
                column: "processorId",
                principalSchema: "ti",
                principalTable: "processingUnit",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_computer_processingUnit_processorId",
                schema: "ti",
                table: "computer");

            migrationBuilder.DropIndex(
                name: "IX_computer_processorId",
                schema: "ti",
                table: "computer");

            migrationBuilder.DropColumn(
                name: "processorId",
                schema: "ti",
                table: "computer");

            migrationBuilder.RenameColumn(
                name: "updatedAt",
                schema: "ti",
                table: "computerLog",
                newName: "updateAt");

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

            migrationBuilder.CreateIndex(
                name: "IX_computerProcessingUnit_processingUnitId",
                schema: "ti",
                table: "computerProcessingUnit",
                column: "processingUnitId");
        }
    }
}
