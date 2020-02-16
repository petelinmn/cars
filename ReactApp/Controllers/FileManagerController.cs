using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;
using System.Data;
using Dapper;
using System.IO;

namespace ReactApp.Controllers
{
    public class Dir
    {
        public string Name { get; set; }
        public string[] Files { get; set; }
        public string[] Dirs { get; set; }
    }

    
    /// <summary>
    /// api контроллер для доступа к данным о людях
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class FileManagerController : ControllerBase
    {
        private readonly ILogger<PersonController> _logger;

        public FileManagerController(ILogger<PersonController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("{disk}")]
        [Route("{disk}/{path}")]
        public ActionResult Get(string disk, string path)
        {
            try
            {
                var url = disk + @":\\" + path?.Replace("@", @"\\");
                var dir = new DirectoryInfo(url);

                var dirs = dir.GetDirectories();
                var files = dir.GetFiles();
                return new JsonResult(new {
                    Success = true,
                    Result = new Dir()
                    {
                        Name = dir.Name,
                        Files = files.Select(f => f.Name).ToArray(),
                        Dirs = dirs.Select(d => d.Name).ToArray()
                    }
                });
            }
            catch(Exception exception)
            {
                return new JsonResult(new { 
                    Success = false,
                    ErrorMessage = exception.Message
                });
            }
        }

        [HttpGet]
        [Route("disks")]
        public ActionResult GetAllDisks()
        {
            try
            {
                return new JsonResult(new
                {
                    Success = true,
                    Result = DriveInfo.GetDrives().Select(d => d.Name.Substring(0, 1)).ToArray()
                });
            }
            catch(Exception ex)
            {
                return new JsonResult(new {
                    Success = true,
                    ErrorMessage = ex.Message
                });
            }
        }
    }
}
