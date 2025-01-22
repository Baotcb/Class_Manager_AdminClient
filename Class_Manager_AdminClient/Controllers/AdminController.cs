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
            switch (n)
            {
                case 0: return PartialView("Home");
                case 1: return PartialView("Notification");
                case 2: return PartialView("ListTeacher");
                case 3: return PartialView("ListStudent");
                case 4: return PartialView("ListClass");
                default: return RedirectToAction("Error", "Home");
            }
        }
    }
}
