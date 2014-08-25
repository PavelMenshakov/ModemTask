using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace StudentsList.Models
{
    [DataContract]
    public class Subject
    {
        [DataMember(Name="Id")]
        public long Id { get; set; }
        [DataMember(Name="Name")]
        public string Name { get; set; }
        [DataMember(Name = "Hours")]
        public long Hours { get; set; }
        [DataMember(Name = "Students")]
        public ICollection<Student> Students { get; set; }
    }
}