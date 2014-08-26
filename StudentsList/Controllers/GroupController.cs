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
    public class GroupController : ApiController
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
        public List<Student> Get(int id)
        {
            List<Student> st = new List<Student>();
            using (var StudentsDb = new StudentsContext())
            {
                var group =
                    StudentsDb.Groups.Find(id);
                if (group.Students!=null)
                {
                    foreach (var student in group.Students)
                    {
                        st.Add(new Student
                        {
                            FName = student.FName,
                            LName = student.LName,
                            SName = student.SName,
                            BDate = student.BDate,
                            IncomDate = student.IncomDate,
                            Sex = student.Sex,
                            Id = student.Id
                        });
                    }
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
           /*  */
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
                var stud = (from Student in ctx.Students
                            where Student.Id == id
                            select Student).FirstOrDefault();
                ctx.Students.Remove(stud);
                ctx.SaveChanges();
            }
        }
    }
}