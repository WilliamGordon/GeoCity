using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace geocity.infrastructure.Migrations
{
    public partial class ItinaryPointOfCrossingCorrection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItinaryPointOfCrossing_Itinaries_ItinaryId",
                table: "ItinaryPointOfCrossing");

            migrationBuilder.DropForeignKey(
                name: "FK_ItinaryPointOfCrossing_PointOfCrossing_PointOfCrossingId",
                table: "ItinaryPointOfCrossing");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItinaryPointOfCrossing",
                table: "ItinaryPointOfCrossing");

            migrationBuilder.RenameTable(
                name: "ItinaryPointOfCrossing",
                newName: "ItinaryPointOfCrossings");

            migrationBuilder.RenameIndex(
                name: "IX_ItinaryPointOfCrossing_PointOfCrossingId",
                table: "ItinaryPointOfCrossings",
                newName: "IX_ItinaryPointOfCrossings_PointOfCrossingId");

            migrationBuilder.RenameIndex(
                name: "IX_ItinaryPointOfCrossing_ItinaryId",
                table: "ItinaryPointOfCrossings",
                newName: "IX_ItinaryPointOfCrossings_ItinaryId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedDate",
                table: "ItinaryPointOfCrossings",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "ItinaryPointOfCrossings",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItinaryPointOfCrossings",
                table: "ItinaryPointOfCrossings",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ItinaryPointOfCrossings_Itinaries_ItinaryId",
                table: "ItinaryPointOfCrossings",
                column: "ItinaryId",
                principalTable: "Itinaries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ItinaryPointOfCrossings_PointOfCrossing_PointOfCrossingId",
                table: "ItinaryPointOfCrossings",
                column: "PointOfCrossingId",
                principalTable: "PointOfCrossing",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItinaryPointOfCrossings_Itinaries_ItinaryId",
                table: "ItinaryPointOfCrossings");

            migrationBuilder.DropForeignKey(
                name: "FK_ItinaryPointOfCrossings_PointOfCrossing_PointOfCrossingId",
                table: "ItinaryPointOfCrossings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItinaryPointOfCrossings",
                table: "ItinaryPointOfCrossings");

            migrationBuilder.RenameTable(
                name: "ItinaryPointOfCrossings",
                newName: "ItinaryPointOfCrossing");

            migrationBuilder.RenameIndex(
                name: "IX_ItinaryPointOfCrossings_PointOfCrossingId",
                table: "ItinaryPointOfCrossing",
                newName: "IX_ItinaryPointOfCrossing_PointOfCrossingId");

            migrationBuilder.RenameIndex(
                name: "IX_ItinaryPointOfCrossings_ItinaryId",
                table: "ItinaryPointOfCrossing",
                newName: "IX_ItinaryPointOfCrossing_ItinaryId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedDate",
                table: "ItinaryPointOfCrossing",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETDATE()");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "ItinaryPointOfCrossing",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETDATE()");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItinaryPointOfCrossing",
                table: "ItinaryPointOfCrossing",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ItinaryPointOfCrossing_Itinaries_ItinaryId",
                table: "ItinaryPointOfCrossing",
                column: "ItinaryId",
                principalTable: "Itinaries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ItinaryPointOfCrossing_PointOfCrossing_PointOfCrossingId",
                table: "ItinaryPointOfCrossing",
                column: "PointOfCrossingId",
                principalTable: "PointOfCrossing",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }
    }
}
