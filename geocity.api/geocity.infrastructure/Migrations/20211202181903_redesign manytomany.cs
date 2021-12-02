using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace geocity.infrastructure.Migrations
{
    public partial class redesignmanytomany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItinaryPlace");

            migrationBuilder.DropTable(
                name: "ItinaryUser");

            migrationBuilder.CreateTable(
                name: "ItinaryPlaces",
                columns: table => new
                {
                    ItinaryId = table.Column<int>(type: "int", nullable: false),
                    PlaceId = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Duration = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItinaryPlaces", x => new { x.ItinaryId, x.PlaceId });
                    table.ForeignKey(
                        name: "FK_ItinaryPlaces_Itinaries_ItinaryId",
                        column: x => x.ItinaryId,
                        principalTable: "Itinaries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItinaryPlaces_Places_PlaceId",
                        column: x => x.PlaceId,
                        principalTable: "Places",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ItinaryUsers",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ItinaryId = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false),
                    IsOwner = table.Column<bool>(type: "bit", nullable: false),
                    IsParticipant = table.Column<bool>(type: "bit", nullable: false),
                    IsFavorite = table.Column<bool>(type: "bit", nullable: false),
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
                name: "IX_ItinaryPlaces_PlaceId",
                table: "ItinaryPlaces",
                column: "PlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_ItinaryUsers_UserId",
                table: "ItinaryUsers",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItinaryPlaces");

            migrationBuilder.DropTable(
                name: "ItinaryUsers");

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

            migrationBuilder.CreateTable(
                name: "ItinaryUser",
                columns: table => new
                {
                    ItinariesId = table.Column<int>(type: "int", nullable: false),
                    UsersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItinaryUser", x => new { x.ItinariesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_ItinaryUser_Itinaries_ItinariesId",
                        column: x => x.ItinariesId,
                        principalTable: "Itinaries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItinaryUser_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItinaryPlace_PlacesId",
                table: "ItinaryPlace",
                column: "PlacesId");

            migrationBuilder.CreateIndex(
                name: "IX_ItinaryUser_UsersId",
                table: "ItinaryUser",
                column: "UsersId");
        }
    }
}
