﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkRepositories.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } 
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set;}
        public string? MemberType { get; set; }
        [ForeignKey("Country")]
        public int CountryId { get; set; }
        public string? OrganisationCode { get; set; }
        [ForeignKey("Role")]
        public int? RoleId { get; set; }

        public Country Country { get; set; }
        public Role Role { get; set; }

    }
}
