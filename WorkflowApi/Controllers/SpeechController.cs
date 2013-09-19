using System;
using System.Collections.Generic;
using System.Linq;
using System.Messaging;
using System.Web;
using System.Web.Mvc;

namespace WorkflowApi.Controllers
{
    public class SpeechController : Controller
    {
        [HttpPost]
        public ActionResult Index(string words)
        {
            var queue = new MessageQueue(@"MTL492PWW1\PRIVATE$\restfest-speech");
            queue.Send(words);
            return new EmptyResult();
        }
    }
}
