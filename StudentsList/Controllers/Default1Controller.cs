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
    public class Default1Controller : ApiController
    {
        // GET api/default1
        public List<Group> Get()
        {
            using (var StudentsDb = new StudentsContext())
            {
                return StudentsDb.Groups.ToList();
            }
        }

     
        // GET api/default1/3
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

        // POST api/default1
        public void Post([FromBody]Group value)
        {
            using (StudentsContext ctx = new StudentsContext())
            {
                ctx.Groups.Add(value);
                ctx.SaveChanges();
            }
        }

        // PUT api/default1/5
        public void Put(int id, [FromBody]Student value)
        {

        }

        // DELETE api/default1/5
        public void Delete(int id)
        {
            using (StudentsContext ctx = new StudentsContext())
            {
                var stud = (from Student in ctx.StudentsList
                            where Student.Id == id
                            select Student).FirstOrDefault();
                ctx.StudentsList.Remove(stud);
                ctx.SaveChanges();
            }
        }
    }
}
