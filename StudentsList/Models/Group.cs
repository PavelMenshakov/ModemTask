using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace StudentsList.Models
{
    [DataContract]
    public class Group
    {
        [DataMember(Name = "GroupId")]
        public long Id { get; set; }

        [DataMember(Name = "GroupName")]
        public string Name { get; set; }

        [DataMember(Name = "GroupStudentsL")]
        public ICollection<Student> StudentsL { get; set; }
    }
}