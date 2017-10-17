using Microsoft.AspNetCore.Mvc;

namespace FirstCore.Controllers
{
    public class HomeController : Controller
    {

        [HttpGet]
        public JsonResult Index()
        {
            return Json("{\"personalData\" : [{\"firstName\" : \"Евгений\"}]}");
        }
    }
}