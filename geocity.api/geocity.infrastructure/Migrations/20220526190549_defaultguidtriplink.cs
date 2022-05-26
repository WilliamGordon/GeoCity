using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace geocity.infrastructure.Migrations
{
    public partial class defaultguidtriplink : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TripUsers_Users_UserAuth0Id",
                table: "TripUsers");

            migrationBuilder.DropIndex(
                name: "IX_TripUsers_UserAuth0Id",
                table: "TripUsers");

            migrationBuilder.DropColumn(
                name: "UserAuth0Id",
                table: "TripUsers");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "TripUsers",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "Link",
                table: "Trips",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "NEWID()",
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateIndex(
                name: "IX_TripUsers_UserId",
                table: "TripUsers",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TripUsers_Users_UserId",
                table: "TripUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Auth0Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TripUsers_Users_UserId",
                table: "TripUsers");

            migrationBuilder.DropIndex(
                name: "IX_TripUsers_UserId",
                table: "TripUsers");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "TripUsers",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "UserAuth0Id",
                table: "TripUsers",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<Guid>(
                name: "Link",
                table: "Trips",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldDefaultValueSql: "NEWID()");

            migrationBuilder.CreateIndex(
                name: "IX_TripUsers_UserAuth0Id",
                table: "TripUsers",
                column: "UserAuth0Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TripUsers_Users_UserAuth0Id",
                table: "TripUsers",
                column: "UserAuth0Id",
                principalTable: "Users",
                principalColumn: "Auth0Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
