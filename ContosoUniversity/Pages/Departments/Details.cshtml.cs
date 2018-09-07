using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using ContosoUniversity.Models;

namespace ContosoUniversity.Pages.Departments
{
    public class DetailsModel : PageModel
    {
        private readonly ContosoUniversity.Models.SchoolContext _context;

        public DetailsModel(ContosoUniversity.Models.SchoolContext context)
        {
            _context = context;
        }

        public Department Department { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var query = "select * from Department where DepartmentID = {0}";

            Department = await _context.Departments
                .FromSql(query, id)
                .Include(d => d.Administrator)
                .AsNoTracking()
                .SingleOrDefaultAsync();

            if (Department == null)
            {
                return NotFound();
            }
            return Page();
        }
    }
}
