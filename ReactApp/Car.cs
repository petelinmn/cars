using System;

namespace ReactApp
{
    public class Car
    {
        public int Id { get; set; }
        public string Marka { get; set; }

        public string Model { get; set; }

        public int Year { get; set; }

        public int Age
        {
            get
            {
                return DateTime.Now.Year - Year;
            }
        }
    }
}
