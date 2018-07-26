namespace ContosoUniversity.Models
{
    public class CourseAssignment //Pure Join Table Entity
    {
        public int CourseID { get; set; }
        public int InstructorID { get; set; }

        public Course Course { get; set; }
        public Instructor Instructor { get; set; }
    }
}