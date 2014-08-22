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
        public List<Object> Get()
        {
            using (var StudentsDb = new StudentsContext())
            {
                List<Object> o = new List<Object>();
                var query = StudentsDb.Groups.Include("Students");
                foreach (var gp in query)
                    o.Add(gp);
                //List<Group> g = StudentsDb.Groups.ToList();
                return o;
            }
        }


        // GET api/default1/3
        public Student Get(int id)
        {
            Student st = new Student();
            using (var StudentsDb = new StudentsContext())
            {
                var students = from Student in StudentsDb.Students
                               where Student.Id == id
                               select Student;
                foreach (var student in students)
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
           /*     if (value.Id == -1)
                {
                    Student e = new Student()
                    {
                        FName = value.FName,
                        SName = value.SName,
                        LName = value.LName,
                        BDate = value.BDate,
                        IncomDate = value.IncomDate,
                        Sex = value.Sex
                    };
                    ctx.Students.Add(e);
                    ctx.SaveChanges();
                }
                else
                {
                    var original = ctx.Students.Find(value.Id);
                    if (original != null)
                    {
                        original.FName = value.FName;
                        original.SName = value.SName;
                        original.LName = value.LName;
                        original.BDate = value.BDate;
                        original.IncomDate = value.IncomDate;
                        original.Sex = value.Sex;
                        ctx.SaveChanges();
                    }
                }*/
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