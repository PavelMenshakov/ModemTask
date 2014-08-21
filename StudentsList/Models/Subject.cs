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
        [DataMember(Name="SubjectId")]
        public long SubjectId { get; set; }
        [DataMember(Name="SubjectName")]
        public string SubjectName { get; set; }
        [DataMember(Name = "SubjectHours")]
        public string SubjectHours { get; set; }
    }
}