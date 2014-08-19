using StudentsList.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using System.Web;
using System.Data.Entity;
namespace StudentsList.Controllers
{
    public class Default3Controller : ApiController
    {
        // GET api/default3
        public List<Student> Get()
        {
            using (var StudentsDb = new StudentsContext())
            {
                return StudentsDb.StudentsList.ToList();
            }
        }

     
        // GET api/default3/3
        public Student Get(int id)
        {
            Student st = new Student();
            using (var StudentsDb = new StudentsContext())
            {
                var students = from Student in StudentsDb.StudentsList
                              where Student.Id == id
                                  select Student;
                foreach(var student in students)
                {
                    st.FName = student.FName;
                    st.LName = student.LName;
                    st.SName = student.SName;
                    st.BDate = student.BDate;
                    st.IncomDate = student.IncomDate;
                    st.Sex = student.Sex;
                   
                }
            }
            return st;
        }

        
    }
}
