using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace MvcMovie.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new MvcMovieContext(
                                serviceProvider.GetRequiredService
                                <DbContextOptions<MvcMovieContext>>()))
            {
                var isExist = context.Movie.AnyAsync().Result;
                if(isExist)
                {
                    return;
                }

                context.AddRangeAsync(
                    new Movie{
                        Title = "When Harry Met Sally",
                        ReleaseDate = DateTime.Parse("1989-11-1"),
                        Genre = "Romantic Comedy",
                        Rating = "R",
                        Price = 7.99M
                    },

                    new Movie
                     {
                         Title = "Ghostbusters ",
                         ReleaseDate = DateTime.Parse("1984-3-13"),
                         Genre = "Comedy",
                         Rating = "R",
                         Price = 8.99M
                     },

                     new Movie
                     {
                         Title = "Ghostbusters 2",
                         ReleaseDate = DateTime.Parse("1986-2-23"),
                         Genre = "Comedy",
                         Rating = "R",
                         Price = 9.99M
                     },

                   new Movie
                   {
                       Title = "Rio Bravo",
                       ReleaseDate = DateTime.Parse("1959-4-15"),
                       Genre = "Western",
                       Rating = "R",
                       Price = 3.99M
                   }
                );

                context.SaveChangesAsync();
            }
        }

    }
}