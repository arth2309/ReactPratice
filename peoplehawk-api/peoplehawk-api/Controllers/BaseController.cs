using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace peoplehawk_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BaseController : ControllerBase
{
    protected void ValidateModel()
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                                   .SelectMany(v => v.Errors)
                                   .Select(e => e.ErrorMessage)
                                   .ToList();
            throw new BadHttpRequestException(string.Join(", ", errors));
        }
    }
}
