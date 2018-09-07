using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using ContosoUniversity.Models;
using ContosoUniversity.ViewModels;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace ContosoUniversity.Pages
{
    public class AboutModel : PageModel
    {
        private readonly SchoolContext _context;
        public AboutModel(SchoolContext context)
        {
            _context = context;
        }

        public IList<EnrollmentDateGroup> Students { get; set; }

        public async Task OnGetAsync()
        {
            List<EnrollmentDateGroup> groups = new List<EnrollmentDateGroup>();
            var connect = _context.Database.GetDbConnection();
            try
            {
                await connect.OpenAsync();
                using (var command = connect.CreateCommand())
                {
                    var query = "select EnrollmentDate, COUNT(*) as StudentCount "
                              + "FROM Person "
                              + "WHERE Discriminator = 'Student' "
                              + "GROUP BY EnrollmentDate";
                    command.CommandText = query;
                    using (DbDataReader reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            while (await reader.ReadAsync())
                            {
                                var row = new EnrollmentDateGroup { EnrollmentDate = reader.GetDateTime(0), StudentCount = reader.GetInt32(1) };
                                groups.Add(row);
                            }
                        }
                    }
                }
            }
            finally
            {
                connect.Close();
            }
            Students = groups;
        }
    }
}
