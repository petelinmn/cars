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
    public class PersonsRepository {
        public static string ConnectionString { get; set; } = "Data Source=localhost;Initial Catalog=Persons;Trusted_Connection=True;";


        public static Person[] GetPersons()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                return connection.Query<Person>("SELECT * from Persons").ToArray();
            }
        }

        public static Person GetPerson(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                return connection.QueryFirst<Person>("SELECT top 1 from Persons where Id = " + id.ToString());
            }
        }
    }


    [ApiController]
    [Route("[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly ILogger<PersonController> _logger;

        public PersonController(ILogger<PersonController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Person> Get()
        {
            return PersonRepository.GetPersons();

        }

        [HttpGet]
        [Route("[controller]/id")]
        public Person Get(int id)
        {
            return PersonRepository.GetPerson(id);
        }
    }
}
