using System;
using System.ComponentModel.DataAnnotations;

namespace ContosoUniversity.ViewModels
{
    public class EnrollmentDateGroup
    {
        [Display(Name = "Enrollment Date"), DisplayFormat(DataFormatString ="{0:dd-MM-yyyy}")]
        public DateTime? EnrollmentDate { get; set; }
        public int StudentCount { get; set; }
    }
}