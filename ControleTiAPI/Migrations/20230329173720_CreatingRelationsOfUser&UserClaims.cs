using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleTiAPI.Migrations
{
    /// <inheritdoc />
    public partial class CreatingRelationsOfUserUserClaims : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "lastPassword",
                schema: "ti",
                table: "user");

            migrationBuilder.RenameColumn(
                name: "displayName",
                schema: "ti",
                table: "user",
                newName: "displayname");

            migrationBuilder.RenameColumn(
                name: "name",
                schema: "ti",
                table: "user",
                newName: "username");

            migrationBuilder.AddColumn<bool>(
                name: "userIsActive",
                schema: "ti",
                table: "user",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "userClaims",
                schema: "ti",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    claimType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    claimValue = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    userId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userClaims", x => x.id);
                    table.ForeignKey(
                        name: "FK_userClaims_user_userId",
                        column: x => x.userId,
                        principalSchema: "ti",
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "EmailUserIndex",
                schema: "ti",
                table: "user",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_userClaims_userId",
                schema: "ti",
                table: "userClaims",
                column: "userId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "userClaims",
                schema: "ti");

            migrationBuilder.DropIndex(
                name: "EmailUserIndex",
                schema: "ti",
                table: "user");

            migrationBuilder.DropColumn(
                name: "userIsActive",
                schema: "ti",
                table: "user");

            migrationBuilder.RenameColumn(
                name: "displayname",
                schema: "ti",
                table: "user",
                newName: "displayName");

            migrationBuilder.RenameColumn(
                name: "username",
                schema: "ti",
                table: "user",
                newName: "name");

            migrationBuilder.AddColumn<string>(
                name: "lastPassword",
                schema: "ti",
                table: "user",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);
        }
    }
}
