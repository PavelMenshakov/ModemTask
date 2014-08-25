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
    public class SubjectController : ApiController
    {
        // GET api/default3
        public List<Subject> Get()
        {
            using (var StudentsDb = new StudentsContext())
            {
                return StudentsDb.Subjects.ToList();
            }
        }


        // GET api/default3/3
        public Subject Get(int id)
        {
            Subject Sub = new Subject();
            using (var StudentsDb = new StudentsContext())
            {
                var subjectq = from Subject in StudentsDb.Subjects
                               where Subject.Id == id
                               select Subject;
                foreach (var subject in subjectq)
                {
                    Sub.Name = subject.Name;
                    Sub.Hours = subject.Hours;

                }
            }
            return Sub;
        }

        // POST api/default1
        public void Post([FromBody]Subject value)
        {
            using (StudentsContext ctx = new StudentsContext())
            {
                ctx.Subjects.Add(value);
                ctx.SaveChanges();
            }
        }


    }
}
