using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace geocity.infrastructure.Migrations
{
    public partial class correcteditinaries : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Itinaries_Coordinates_CityId",
                table: "Itinaries");

            migrationBuilder.DropIndex(
                name: "IX_Itinaries_CityId",
                table: "Itinaries");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Itinaries");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Coordinates");

            migrationBuilder.AddColumn<decimal>(
                name: "CityLat",
                table: "Itinaries",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "CityLng",
                table: "Itinaries",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "CityName",
                table: "Itinaries",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Places",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PositionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Places", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Places_Coordinates_PositionId",
                        column: x => x.PositionId,
                        principalTable: "Coordinates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ItinaryPlace",
                columns: table => new
                {
                    ItinariesId = table.Column<int>(type: "int", nullable: false),
                    PlacesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItinaryPlace", x => new { x.ItinariesId, x.PlacesId });
                    table.ForeignKey(
                        name: "FK_ItinaryPlace_Itinaries_ItinariesId",
                        column: x => x.ItinariesId,
                        principalTable: "Itinaries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItinaryPlace_Places_PlacesId",
                        column: x => x.PlacesId,
                        principalTable: "Places",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItinaryPlace_PlacesId",
                table: "ItinaryPlace",
                column: "PlacesId");

            migrationBuilder.CreateIndex(
                name: "IX_Places_PositionId",
                table: "Places",
                column: "PositionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItinaryPlace");

            migrationBuilder.DropTable(
                name: "Places");

            migrationBuilder.DropColumn(
                name: "CityLat",
                table: "Itinaries");

            migrationBuilder.DropColumn(
                name: "CityLng",
                table: "Itinaries");

            migrationBuilder.DropColumn(
                name: "CityName",
                table: "Itinaries");

            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "Itinaries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Coordinates",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Itinaries_CityId",
                table: "Itinaries",
                column: "CityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Itinaries_Coordinates_CityId",
                table: "Itinaries",
                column: "CityId",
                principalTable: "Coordinates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
