﻿using StudentsList.Models;
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
    public class StudentController : ApiController
    {
        // GET api/student
        public List<Student> Get()
        {
            using (var StudentsDb = new StudentsContext())
            {
                List<Student> st = new List<Student>();
                var query = StudentsDb.Students; //Include("Subjects");
                foreach (var gp in query)
                    st.Add(gp);
                return st;
            }
        }

        // GET api/student/5
        public Student Get(int id)
        {
            Student st = new Student();
            using (var StudentsDb = new StudentsContext())
            {
                var students = from Student in StudentsDb.Students.Include("Subjects")
                               where Student.Id == id
                               select Student;
                foreach (var student in students)
                {
                    ICollection<Subject> subCol = new List<Subject>();
                    foreach (var sub in student.Subjects)
                    {
                        subCol.Add(new Subject
                        {
                            Id = sub.Id,
                            Name = sub.Name,
                            Hours = sub.Hours
                        });
                    }
                    st.FName = student.FName;
                    st.LName = student.LName;
                    st.SName = student.SName;
                    st.BDate = student.BDate;
                    st.IncomDate = student.IncomDate;
                    st.Sex = student.Sex;
                    st.Subjects = subCol;
                }
            }
            return st;
        }

        // POST api/student
        public void Post([FromBody]Student value)
        {

            using (StudentsContext ctx = new StudentsContext())
            {
                ICollection<Subject> subCol = new List<Subject>();
                if (value.Subjects != null)
                {
                    foreach (var sub in value.Subjects)
                    {
                        subCol.Add(ctx.Subjects.Find(sub.Id));
                    }
                }
                var original = ctx.Students.Include("Subjects").First(s=>s.Id == value.Id);
                if (original != null)
                {
                    original.FName = value.FName;
                    original.SName = value.SName;
                    original.LName = value.LName;
                    original.BDate = value.BDate;
                    original.IncomDate = value.IncomDate;
                    original.Sex = value.Sex;
                    original.Subjects = subCol;
                    ctx.SaveChanges();
                }

            }
            
        }

        // PUT api/student/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/student/5
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