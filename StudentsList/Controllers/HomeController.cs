using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StudentsList.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Default2/

        public ActionResult Index()
        {
            return File("Views/Default2/index.html", "text/html");
        }

        
    }
}
