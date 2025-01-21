using Microsoft.AspNetCore.Mvc;

namespace Class_Manager_AdminClient.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
