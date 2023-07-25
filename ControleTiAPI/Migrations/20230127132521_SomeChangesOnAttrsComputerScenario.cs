using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class SomeChangesOnAttrsComputerScenario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_computer_ComputerProfile_profileId",
                schema: "ti",
                table: "computer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ComputerProfile",
                schema: "ti",
                table: "ComputerProfile");

            migrationBuilder.RenameTable(
                name: "ComputerProfile",
                schema: "ti",
                newName: "profile",
                newSchema: "ti");

            migrationBuilder.AlterColumn<string>(
                name: "generation",
                schema: "ti",
                table: "processingUnit",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "frequency",
                schema: "ti",
                table: "processingUnit",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AddColumn<bool>(
                name: "status",
                schema: "ti",
                table: "computerLog",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_profile",
                schema: "ti",
                table: "profile",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "NameProfileIndex",
                schema: "ti",
                table: "profile",
                column: "name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_computer_profile_profileId",
                schema: "ti",
                table: "computer",
                column: "profileId",
                principalSchema: "ti",
                principalTable: "profile",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_computer_profile_profileId",
                schema: "ti",
                table: "computer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_profile",
                schema: "ti",
                table: "profile");

            migrationBuilder.DropIndex(
                name: "NameProfileIndex",
                schema: "ti",
                table: "profile");

            migrationBuilder.DropColumn(
                name: "status",
                schema: "ti",
                table: "computerLog");

            migrationBuilder.RenameTable(
                name: "profile",
                schema: "ti",
                newName: "ComputerProfile",
                newSchema: "ti");

            migrationBuilder.AlterColumn<int>(
                name: "generation",
                schema: "ti",
                table: "processingUnit",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<double>(
                name: "frequency",
                schema: "ti",
                table: "processingUnit",
                type: "float",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ComputerProfile",
                schema: "ti",
                table: "ComputerProfile",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_computer_ComputerProfile_profileId",
                schema: "ti",
                table: "computer",
                column: "profileId",
                principalSchema: "ti",
                principalTable: "ComputerProfile",
                principalColumn: "id");
        }
    }
}
