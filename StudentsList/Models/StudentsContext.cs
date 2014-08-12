using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace StudentsList.Models
{
    public class StudentsContext:DbContext
    {
        public DbSet<Student> StudentsList { get; set; }
    }
}