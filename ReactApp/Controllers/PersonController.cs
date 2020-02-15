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
    /// <summary>
    /// Класс для работы с таблицей базы данных Persons
    /// </summary>
    public class PersonRepository {
        public static string ConnectionString { get; set; } = "Data Source=localhost;Initial Catalog=Cars;Trusted_Connection=True;";
        
        /// <summary>
        /// Получить всех людей
        /// </summary>
        /// <returns></returns>
        public static Person[] GetPersons()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                return connection.Query<Person>("SELECT * from Persons").ToArray();
            }
        }

        /// <summary>
        /// Получить данные о человеке по Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static Person GetPerson(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                return connection.QueryFirst<Person>("SELECT top 1 from Persons where Id = " + id.ToString());
            }
        }

        /// <summary>
        /// Добавить данные о человеке
        /// </summary>
        /// <param name="person">Описание</param>
        /// <returns></returns>
        public static int Add(Person person)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                using(var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        int result = connection.Execute(
                            @$"insert into persons values(
                             @{nameof(person.Name)},
                             @{nameof(person.Surname)},
                             @{nameof(person.Age)})", 
                         new { person.Name, person.Surname, person.Age }, 
                         transaction);

                        transaction.Commit();
                        return result;
                    }
                    catch(Exception e)
                    {
                        Console.WriteLine(e.Message);
                        transaction.Rollback();
                    }
                    finally
                    {
                        connection.Close();
                    }

                    return -1;
                }
            }
        }


        /// <summary>
        /// Удаление из таблицы человека
        /// </summary>
        /// <param name="id">Идентификатор человека</param>
        public static void Delete(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        connection.Execute(
                            @$"delete from persons where id = @{nameof(id)}",
                         new { id },
                         transaction);

                        transaction.Commit();
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e.Message);
                        transaction.Rollback();
                    }
                    finally
                    {
                        connection.Close();
                    }
                }
            }
        }
    }


    /// <summary>
    /// api контроллер для доступа к данным о людях
    /// </summary>
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

        [HttpPost]
        [Route("add")]
        public void Post(Person person)
        {
            PersonRepository.Add(person);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public void Delete (int id)
        {
            PersonRepository.Delete(id);
        }
    
        
    }
}
