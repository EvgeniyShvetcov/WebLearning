using System;
using System.ComponentModel.DataAnnotations;

namespace MvcMovie.Models
{
    public class Movie
    {
        public int ID{get;set;}
        [StringLength(60, MinimumLength = 3)]
        public string Title{get;set;}
        [Display(Name = "Release Date"), DisplayFormat(DataFormatString = "{0:dd.MM.yyyy}")]
        public DateTime ReleaseDate{get;set;}
        [RegularExpression(@"^[A-Z]+[a-zA-Z""'\s-]*$"), Required, StringLength(30)]
        public string Genre{get;set;}
        [DataType(DataType.Currency), Range(1,100)]
        public decimal Price{get;set;}
        [RegularExpression(@"^[A-Z]+[a-zA-Z""'\s-]*$"), Required, StringLength(5)]
        public string Rating{get;set;}
    }
}