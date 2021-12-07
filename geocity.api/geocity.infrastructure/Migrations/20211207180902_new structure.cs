using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace geocity.infrastructure.Migrations
{
    public partial class newstructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Places_Coordinates_PositionId",
                table: "Places");

            migrationBuilder.DropTable(
                name: "Coordinates");

            migrationBuilder.DropTable(
                name: "ItinaryUsers");

            migrationBuilder.DropIndex(
                name: "IX_Places_PositionId",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "PositionId",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "CityLat",
                table: "Itinaries");

            migrationBuilder.DropColumn(
                name: "IsPublished",
                table: "Itinaries");

            migrationBuilder.RenameColumn(
                name: "CityName",
                table: "Itinaries",
                newName: "Duration");

            migrationBuilder.RenameColumn(
                name: "CityLng",
                table: "Itinaries",
                newName: "Distance");

            migrationBuilder.AddColumn<decimal>(
                name: "Longitude",
                table: "Places",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "latitude",
                table: "Places",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "TripId",
                table: "Itinaries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "Latitude",
                table: "Cities",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Longitude",
                table: "Cities",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateTable(
                name: "Trips",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NbDays = table.Column<int>(type: "int", nullable: false),
                    IsPublished = table.Column<bool>(type: "bit", nullable: false),
                    CityId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trips", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Trips_Cities_CityId",
                        column: x => x.CityId,
                        principalTable: "Cities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TripUsers",
                columns: table => new
                {
                    TripId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false),
                    IsOwner = table.Column<bool>(type: "bit", nullable: false),
                    IsParticipant = table.Column<bool>(type: "bit", nullable: false),
                    IsFavorite = table.Column<bool>(type: "bit", nullable: false),
                    Rating = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TripUsers", x => new { x.TripId, x.UserId });
                    table.ForeignKey(
                        name: "FK_TripUsers_Trips_TripId",
                        column: x => x.TripId,
                        principalTable: "Trips",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TripUsers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Itinaries_TripId",
                table: "Itinaries",
                column: "TripId");

            migrationBuilder.CreateIndex(
                name: "IX_Trips_CityId",
                table: "Trips",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_TripUsers_UserId",
                table: "TripUsers",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Itinaries_Trips_TripId",
                table: "Itinaries",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Itinaries_Trips_TripId",
                table: "Itinaries");

            migrationBuilder.DropTable(
                name: "TripUsers");

            migrationBuilder.DropTable(
                name: "Trips");

            migrationBuilder.DropIndex(
                name: "IX_Itinaries_TripId",
                table: "Itinaries");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "latitude",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "TripId",
                table: "Itinaries");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Cities");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Cities");

            migrationBuilder.RenameColumn(
                name: "Duration",
                table: "Itinaries",
                newName: "CityName");

            migrationBuilder.RenameColumn(
                name: "Distance",
                table: "Itinaries",
                newName: "CityLng");

            migrationBuilder.AddColumn<int>(
                name: "PositionId",
                table: "Places",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "CityLat",
                table: "Itinaries",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<bool>(
                name: "IsPublished",
                table: "Itinaries",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "Coordinates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    lat = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    lng = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coordinates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ItinaryUsers",
                columns: table => new
                {
                    ItinaryId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false),
                    IsFavorite = table.Column<bool>(type: "bit", nullable: false),
                    IsOwner = table.Column<bool>(type: "bit", nullable: false),
                    IsParticipant = table.Column<bool>(type: "bit", nullable: false),
                    Rating = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItinaryUsers", x => new { x.ItinaryId, x.UserId });
                    table.ForeignKey(
                        name: "FK_ItinaryUsers_Itinaries_ItinaryId",
                        column: x => x.ItinaryId,
                        principalTable: "Itinaries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItinaryUsers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Places_PositionId",
                table: "Places",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_ItinaryUsers_UserId",
                table: "ItinaryUsers",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Places_Coordinates_PositionId",
                table: "Places",
                column: "PositionId",
                principalTable: "Coordinates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
