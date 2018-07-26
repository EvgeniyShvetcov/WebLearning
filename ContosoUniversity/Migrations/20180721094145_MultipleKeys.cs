using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ContosoUniversity.Migrations
{
    public partial class MultipleKeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           migrationBuilder.DropPrimaryKey(
                name: "PK_Enrollment",
                table: "Enrollment");

            migrationBuilder.DropIndex(
                name: "IX_Enrollment_CourseID",
                table: "Enrollment");

            migrationBuilder.AddColumn<int>(
                name: "EnrollmentID2",
                table: "Enrollment",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.Sql("update Enrollment set EnrollmentID2 = EnrollmentID");

            migrationBuilder.DropColumn(
                name: "EnrollmentID",
                table: "Enrollment");
            
            migrationBuilder.RenameColumn(
                name: "EnrollmentID2",
                table: "Enrollment",
                newName: "EnrollmentID");

            migrationBuilder.AlterColumn<int>(
                name: "EnrollmentID",
                table: "Enrollment",
                nullable: false,
                oldClrType: typeof(int))
                .OldAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Enrollment",
                table: "Enrollment",
                columns: new[] { "EnrollmentID", "CourseID", "StudentID" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Enrollment",
                table: "Enrollment");

            migrationBuilder.AlterColumn<int>(
                name: "EnrollmentID",
                table: "Enrollment",
                nullable: false,
                oldClrType: typeof(int))
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Enrollment",
                table: "Enrollment",
                column: "EnrollmentID");

            migrationBuilder.CreateIndex(
                name: "IX_Enrollment_CourseID",
                table: "Enrollment",
                column: "CourseID");
        }
    }
}
