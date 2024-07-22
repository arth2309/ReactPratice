﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkRepositories.Models
{
    public class CourseInterest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? name { get; set; }

        public string? description { get; set; }

        public string? features { get; set; }

        public string? likes { get; set; }

        public string? courses { get; set; }

        public string? color1 { get; set; }

        public string? color2 { get; set; }
    }
}