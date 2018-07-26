using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContosoUniversity.Models
{
    public class Student
    {
        public int StudentID { get; set; } //Similarly 'ID'
        //[Required]
        [Display(Name = "Last Name")]
        [StringLength(50, MinimumLength=1)] // Required attribute can replace into MinimumLength
        public string LastName { get; set; }
        [Required]
        [Display(Name = "First Name")]
        [StringLength(50, ErrorMessage = "First name cannot be longer than 50 characters.")]
        [Column("FirstName")]
        public string FirstMidName { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Enrollment Date")]
        public DateTime EnrollmentDate { get; set; }
        [Display(Name = "Full Name")]
        public string FullName{ get => LastName + "," + FirstMidName;}

        public ICollection<Enrollment> Enrollments { get; set; }
    }
}