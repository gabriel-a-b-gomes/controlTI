using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class RemakeOfRelashionshipComputerStorage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "computerStorage",
                schema: "ti");

            migrationBuilder.RenameColumn(
                name: "storageSize",
                schema: "ti",
                table: "computer",
                newName: "storageId");

            migrationBuilder.CreateIndex(
                name: "IX_computer_storageId",
                schema: "ti",
                table: "computer",
                column: "storageId");

            migrationBuilder.AddForeignKey(
                name: "FK_computer_storage_storageId",
                schema: "ti",
                table: "computer",
                column: "storageId",
                principalSchema: "ti",
                principalTable: "storage",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_computer_storage_storageId",
                schema: "ti",
                table: "computer");

            migrationBuilder.DropIndex(
                name: "IX_computer_storageId",
                schema: "ti",
                table: "computer");

            migrationBuilder.RenameColumn(
                name: "storageId",
                schema: "ti",
                table: "computer",
                newName: "storageSize");

            migrationBuilder.CreateTable(
                name: "computerStorage",
                schema: "ti",
                columns: table => new
                {
                    storageId = table.Column<int>(type: "int", nullable: false),
                    computerId = table.Column<int>(type: "int", nullable: false),
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
                name: "IX_computerStorage_computerId",
                schema: "ti",
                table: "computerStorage",
                column: "computerId");
        }
    }
}
