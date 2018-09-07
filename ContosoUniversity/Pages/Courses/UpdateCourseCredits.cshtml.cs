using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using ContosoUniversity.ViewModels;

namespace ContosoUniversity.Pages.Courses
{
    public class UpdateCourseCreditsPageModel : PageModel
    {
        private readonly ContosoUniversity.Models.SchoolContext _context;

        public UpdateCourseCreditsPageModel(ContosoUniversity.Models.SchoolContext context)
        {
            _context = context;
        }
        public int RowsAffected { get; set; }

        public async Task<IActionResult> OnPostAsync(int? multiplier)
        {
            if (multiplier != null)
            {
                RowsAffected =
                    await _context.Database.ExecuteSqlCommandAsync(
                        $"UPDATE Course SET Credits = Credits * {multiplier}");
            }
            return Page();
        }
    }
}
