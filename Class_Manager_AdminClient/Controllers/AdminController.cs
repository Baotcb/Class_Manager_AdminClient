using Microsoft.AspNetCore.Mvc;

namespace Class_Manager_AdminClient.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult GetLink(int n)
        {
            if (n==0) return PartialView("Home");
            if (n==1) return PartialView("Notification");
            else return PartialView("ListUser");
        }
    }
}
