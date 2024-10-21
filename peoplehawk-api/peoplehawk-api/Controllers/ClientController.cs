using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace peoplehawk_api.Controllers;

[Authorize(Roles = "Client")]
[Route("api/[controller]")]
[ApiController]
public class ClientController : BaseController
{

}