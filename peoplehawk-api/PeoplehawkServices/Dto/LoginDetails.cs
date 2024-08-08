using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkServices.Dto
{
    public class LoginDetails
    {
        public string? email {  get; set; }

        [Required(ErrorMessage = "Password is required")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$",
                       ErrorMessage = "Password must be at least 8 characters long, include at least one lowercase letter, one uppercase letter, and one special character")]
        public string? password { get; set; }
    }
}
