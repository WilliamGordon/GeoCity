using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace geocity.infrastructure.Migrations
{
    public partial class ItinaryPointOfCrossing : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PointOfCrossing_Itinaries_ItinaryId",
                table: "PointOfCrossing");

            migrationBuilder.DropIndex(
                name: "IX_PointOfCrossing_ItinaryId",
                table: "PointOfCrossing");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "PointOfCrossing");

            migrationBuilder.DropColumn(
                name: "ItinaryId",
                table: "PointOfCrossing");

            migrationBuilder.AddColumn<Guid>(
                name: "CityId",
                table: "PointOfCrossing",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "ItinaryPointOfCrossing",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ItinaryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PointOfCrossingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItinaryPointOfCrossing", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItinaryPointOfCrossing_Itinaries_ItinaryId",
                        column: x => x.ItinaryId,
                        principalTable: "Itinaries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItinaryPointOfCrossing_PointOfCrossing_PointOfCrossingId",
                        column: x => x.PointOfCrossingId,
                        principalTable: "PointOfCrossing",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PointOfCrossing_CityId",
                table: "PointOfCrossing",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_ItinaryPointOfCrossing_ItinaryId",
                table: "ItinaryPointOfCrossing",
                column: "ItinaryId");

            migrationBuilder.CreateIndex(
                name: "IX_ItinaryPointOfCrossing_PointOfCrossingId",
                table: "ItinaryPointOfCrossing",
                column: "PointOfCrossingId");

            migrationBuilder.AddForeignKey(
                name: "FK_PointOfCrossing_Cities_CityId",
                table: "PointOfCrossing",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PointOfCrossing_Cities_CityId",
                table: "PointOfCrossing");

            migrationBuilder.DropTable(
                name: "ItinaryPointOfCrossing");

            migrationBuilder.DropIndex(
                name: "IX_PointOfCrossing_CityId",
                table: "PointOfCrossing");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "PointOfCrossing");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "PointOfCrossing",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ItinaryId",
                table: "PointOfCrossing",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PointOfCrossing_ItinaryId",
                table: "PointOfCrossing",
                column: "ItinaryId");

            migrationBuilder.AddForeignKey(
                name: "FK_PointOfCrossing_Itinaries_ItinaryId",
                table: "PointOfCrossing",
                column: "ItinaryId",
                principalTable: "Itinaries",
                principalColumn: "Id");
        }
    }
}
