using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace geocity.infrastructure.Migrations
{
    public partial class typocoordinates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Itinaries_Coordinate_CityId",
                table: "Itinaries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Coordinate",
                table: "Coordinate");

            migrationBuilder.RenameTable(
                name: "Coordinate",
                newName: "Coordinates");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Coordinates",
                table: "Coordinates",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Itinaries_Coordinates_CityId",
                table: "Itinaries",
                column: "CityId",
                principalTable: "Coordinates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Itinaries_Coordinates_CityId",
                table: "Itinaries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Coordinates",
                table: "Coordinates");

            migrationBuilder.RenameTable(
                name: "Coordinates",
                newName: "Coordinate");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Coordinate",
                table: "Coordinate",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Itinaries_Coordinate_CityId",
                table: "Itinaries",
                column: "CityId",
                principalTable: "Coordinate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
