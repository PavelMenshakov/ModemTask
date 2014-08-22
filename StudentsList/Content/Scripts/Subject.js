function Subject(subjectId, subjectName, subjectHours) {
    this._id = subjectId;
    this._name = subjectName;
    this._hours = subjectHours;
    this.getJSONString = function () {
        return {
            "SubjectId": this._id,
            "SubjectName": this._name,
            "SubjectHours": this._hours
        };
    }
    this.addSubject = function () {
        $.ajax({
            type: 'POST',
            url: '/api/subject',
            data: this.getJSONString(),
            success: function () {
                getSubjects();
            }
        });
    }
    this.getWindowValue = function () {
        this._name = $("[name = 'SubjectName']").val();
        this._hours = $("[name = 'SubjectHours']").val();
    }
}

function getSubjectsArray() {
    var subjects = new Array();
    var list = $("#odjectsTable").find("input");
    list.each(function () {
        var sub = new Subject(this.id.slice(7), this.title, this.value);
        subjects.push(sub);
    });
    console.log(subjects);
    return subjects;
}

function getSubjects() {
    $.getJSON("/api/Subject", pastJSubjects);
}

function pastJSubjects(data) {
    $("#odjectsTable").html("");
    for (var i = 0; i < data.length; i++) {
        $("#odjectsTable").append("<div><input onchange='drawChart()' type='checkbox'  title='" + data[i].SubjectName + "' id='subject" + data[i].SubjectId + "' value='" + data[i].SubjectHours + "'/>" + data[i].SubjectName + "</div>");
    }
}