using System.Diagnostics;
using Class_Manager_AdminClient.Models;
using Class_Manager_AdminClient.Services;
using Microsoft.AspNetCore.Mvc;

namespace Class_Manager_AdminClient.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly SignalRClientService _signalRClientService;

        public HomeController(ILogger<HomeController> logger, SignalRClientService signalRClientService)
        {
            
            _logger = logger;
            _signalRClientService = signalRClientService;
        }

        public async Task<IActionResult> Index()
        {
            await _signalRClientService.StartAsync();
           
            return View();
        }


        [HttpPost]
        public async Task<IActionResult> CheckLogin(string user, string password)
        {
            await _signalRClientService.CheckLogin(user, password);
            return Ok();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
