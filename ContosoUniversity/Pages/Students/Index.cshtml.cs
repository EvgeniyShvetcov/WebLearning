using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using ContosoUniversity.Models;

namespace ContosoUniversity.Pages.Students
{
    public class IndexModel : PageModel
    {
        private readonly ContosoUniversity.Models.SchoolContext _context;

        public IndexModel(ContosoUniversity.Models.SchoolContext context)
        {
            _context = context;
        }

        public PaginatedList<Student> Student { get; set; }

        public string NameSort { get; set; }
        public string DateSort { get; set; }
        public string CurrentFilter { get; set; }
        public string CurrentSort { get; set; }

        public async Task OnGetAsync(string sortOrder, 
           string searchString, int? pageIndex)
        {
            NameSort = String.IsNullOrEmpty(sortOrder) ? "name_desc" : "";
            DateSort = sortOrder == "Date" ? "date_desc" : "Date";

            if(searchString != null)
            {
                pageIndex = 1;
            }

            CurrentSort = sortOrder;
            CurrentFilter = searchString;

            var studentsQuery = from s in _context.Student
                                select s;

            if (!String.IsNullOrEmpty(searchString))
            {
                studentsQuery  = studentsQuery.Where(s => s.LastName.Contains(searchString) 
                                                    || s.FirstMidName.Contains(searchString));
            }
            switch (sortOrder)
            {
                case "name_desc":
                    studentsQuery = studentsQuery.OrderByDescending(s => s.LastName);
                    break;
                case "Date":
                    studentsQuery = studentsQuery.OrderBy(s => s.EnrollmentDate);
                    break;
                case "date_desc":
                    studentsQuery = studentsQuery.OrderByDescending(s => s.EnrollmentDate);
                    break;
                default:
                    studentsQuery = studentsQuery.OrderBy(s => s.LastName);
                    break;
            }
            int pageSize = 3;

            Student = await PaginatedList<Student>.CreateAsync(studentsQuery.AsNoTracking(), pageIndex ?? 1, pageSize);
        }
    }
}
