using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;
using System.Data;
using Dapper;

namespace ReactApp.Controllers
{
    public class CarRepository {
        public static string ConnectionString { get; set; } = "Data Source=localhost;Initial Catalog=Cars;Trusted_Connection=True;";


        public static Car[] GetCars()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                return connection.Query<Car>("SELECT * from Cars").ToArray();
            }
        }

        public static Car GetCar(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                return connection.QueryFirst<Car>("SELECT top 1 from Cars where Id = " + id.ToString());
            }
        }
    }


    [ApiController]
    [Route("[controller]")]
    public class CarController : ControllerBase
    {
        private readonly ILogger<CarController> _logger;

        public CarController(ILogger<CarController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Car> Get()
        {
            return CarRepository.GetCars();

        }

        [HttpGet]
        [Route("[controller]/id")]
        public Car Get(int id)
        {
            return CarRepository.GetCar(id);
        }
    }
}
