using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace geocity.infrastructure.Migrations
{
    public partial class changenameid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TripUserFavorites_Users_UserAuth0Id",
                table: "TripUserFavorites");

            migrationBuilder.DropForeignKey(
                name: "FK_TripUserRatings_Users_UserAuth0Id",
                table: "TripUserRatings");

            migrationBuilder.DropIndex(
                name: "IX_TripUserRatings_UserAuth0Id",
                table: "TripUserRatings");

            migrationBuilder.DropIndex(
                name: "IX_TripUserFavorites_UserAuth0Id",
                table: "TripUserFavorites");

            migrationBuilder.DropColumn(
                name: "UserAuth0Id",
                table: "TripUserRatings");

            migrationBuilder.DropColumn(
                name: "UserAuth0Id",
                table: "TripUserFavorites");

            migrationBuilder.RenameColumn(
                name: "Auth0Id",
                table: "Users",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "TripUserRatings",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "TripUserFavorites",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateIndex(
                name: "IX_TripUserRatings_UserId",
                table: "TripUserRatings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TripUserFavorites_UserId",
                table: "TripUserFavorites",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TripUserFavorites_Users_UserId",
                table: "TripUserFavorites",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TripUserRatings_Users_UserId",
                table: "TripUserRatings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TripUserFavorites_Users_UserId",
                table: "TripUserFavorites");

            migrationBuilder.DropForeignKey(
                name: "FK_TripUserRatings_Users_UserId",
                table: "TripUserRatings");

            migrationBuilder.DropIndex(
                name: "IX_TripUserRatings_UserId",
                table: "TripUserRatings");

            migrationBuilder.DropIndex(
                name: "IX_TripUserFavorites_UserId",
                table: "TripUserFavorites");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Users",
                newName: "Auth0Id");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "TripUserRatings",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "UserAuth0Id",
                table: "TripUserRatings",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "TripUserFavorites",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "UserAuth0Id",
                table: "TripUserFavorites",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_TripUserRatings_UserAuth0Id",
                table: "TripUserRatings",
                column: "UserAuth0Id");

            migrationBuilder.CreateIndex(
                name: "IX_TripUserFavorites_UserAuth0Id",
                table: "TripUserFavorites",
                column: "UserAuth0Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TripUserFavorites_Users_UserAuth0Id",
                table: "TripUserFavorites",
                column: "UserAuth0Id",
                principalTable: "Users",
                principalColumn: "Auth0Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TripUserRatings_Users_UserAuth0Id",
                table: "TripUserRatings",
                column: "UserAuth0Id",
                principalTable: "Users",
                principalColumn: "Auth0Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
