using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace geocity.infrastructure.Migrations
{
    public partial class correctionnbdecimallatlng : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Longitude",
                table: "Places",
                type: "decimal(38,18)",
                precision: 38,
                scale: 18,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Latitude",
                table: "Places",
                type: "decimal(38,18)",
                precision: 38,
                scale: 18,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Longitude",
                table: "Places",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(38,18)",
                oldPrecision: 38,
                oldScale: 18);

            migrationBuilder.AlterColumn<decimal>(
                name: "Latitude",
                table: "Places",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(38,18)",
                oldPrecision: 38,
                oldScale: 18);
        }
    }
}
