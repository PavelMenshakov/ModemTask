using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;

namespace StudentsList.Models
{
    [DataContract]
    public class Student
    {
        [DataMember(Name="Id")]
        public long Id { get; set; }
        [DataMember(Name = "FName")]
        public string FName { get; set; }
        [DataMember(Name = "LName")]
        public string LName { get; set; }
        [DataMember(Name = "SName")]
        public string SName { get; set; }
        [DataMember(Name = "Sex")]
        public bool Sex { get; set; }
        [DataMember(Name = "BDate")]
        public DateTime BDate { get; set; }
        [DataMember(Name = "IncomDate")]
        public DateTime IncomDate { get; set; }
        [DataMember(Name = "Subjects")]
        public ICollection<Subject> Subjects { get; set; }
    }
}