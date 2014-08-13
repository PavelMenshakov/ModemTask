using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace StudentsList.Models
{
    public class Subject
    {
        [DataMember(Name="subjectId")]
        public long SubjectId { get; set; }
        [DataMember(Name="subjectName")]
        public long SubjectName { get; set; }
        [DataMember(Name = "subjectHours")]
        public long SubjectHours { get; set; }
        [DataMember(Name = "subjectStudents")]
        public ICollection<Student> Students { get; set; }

    }
}