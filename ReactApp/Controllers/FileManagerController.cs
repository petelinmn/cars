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
        [Route("getpath/{path}")]
        public Dir Get(string path)
        {
            path = path.Replace("discD", "ClientApp").Replace("@", @"\");
            var dir = new DirectoryInfo(path);
            
            var dirs = dir.GetDirectories(path);
            var files = dir.GetFiles(path);
            return new Dir()
            {
                Name = dir.Name,
                Files = files.Select(f => f.Name).ToArray(),
                Dirs = dirs.Select(d => d.Name).ToArray()
            };
        }
            
        
    }
}
