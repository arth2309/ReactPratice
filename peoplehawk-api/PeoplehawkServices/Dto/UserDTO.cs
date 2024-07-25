using PeoplehawkRepositories.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkServices.Dto
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? MemberType { get; set; }
        public int CountryId { get; set; }
        public string? OrganisationCode { get; set; }
        public int? RoleId { get; set; }

    }
}
