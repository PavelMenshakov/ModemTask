function Student(data) {
    data || (data = 0);
    this._id = data.Id;
    this._fName = data.FName;
    this._lName = data.LName;
    this._sName = data.SName;
    this._sex = data.Sex;
    this._bDate = data.BDate;
    this._incomDate = data.IncomDate;
    this._subjects = 0;

    this.addSubjects = function () {
        this._subjects = Subject.getSubjectsArray();
    };

    this.save = function (url) {
        if (validateFields()) {
            this.getWindowValue();
            $.ajax({
                type: 'POST',
                url: url,
                data: this.getJSONObject(),
                success: function () {
                    Student.getAllData($(".grouplist select").val())
                }
            });
        }
    }

    this.printStudent = function () {
        var table = $("#stlist").find("table");
        $(table).append(
            $("<tr/>").append(
                $("<td/>").append(
                    $("<div student-id=" + this._id + "/>").click(Student.focus).append(
                        $("<a/>").attr("class", "student").text(this._lName + " " + this._fName + " " + this._sName)
                    )
                )
            )
        );
    }

    this.getWindowValue = function () {
        this._fName = $("[name = 'fname']").val();
        this._lName = $("[name = 'lname']").val();
        this._sName = $("[name = 'sname']").val();
        this._sex = $("#male").is(":checked");
        this._bDate = $("[name = 'bday']").val();
        this._incomDate = $("[name = 'incomday']").val();
    }

    this.getJSONObject = function () {
        var id = this._id || $(".grouplist select").val();
        return {
            "Id": id,
            "FName": this._fName,
            "LName": this._lName,
            "SName": this._sName,
            "Sex": this._sex,
            "BDate": this._bDate,
            "IncomDate": this._incomDate,
            "Subjects": this._subjects
        };
    }
}



Student.getAllData = function (id) {
    $.getJSON("/api/group/"+id, Student.pasteAllData);
}

Student.pasteAllData = function (data) {
    var table = $("#stlist").find("table");
    $(table).empty();
    var students = new Array();
    $(data).each(function () {
        students.push(new Student(this));
    });
    $(students).each(function () {
        this.printStudent();
    });
}

Student.pasteData = function (data) {
    $("[name = 'fname']").val(data.FName);
    $("[name = 'lname']").val(data.LName);
    $("[name = 'sname']").val(data.SName);
    $("[name = 'bday']").val(data.BDate.split("T")[0]);
    $("[name = 'incomday']").val(data.IncomDate.split("T")[0]);
    if (data.Sex) {
        $("#male").prop('checked', true);
    } else {
        $("#female").prop('checked', true);
    }
    $(data.Subjects).each(function () {
        $('#subject' + this.Id).attr("checked",true).change();
    });
}

Student.delete = function (id) {
    $.ajax({
        type: 'DELETE',
        url: '/api/student/' + id,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function () {
            Student.getAllData()
        }
    });
}

Student.update = function (url,id) {
    var st = new Student();
    st._id = id;
    st.addSubjects();
    st.save(url);
}

Student.getById = function (id) {
    $.getJSON("/api/student/" + id, Student.pasteData);
}

Student.focus = function (e) {
    if ($("#stactive")) {
        $("#stactive").attr("id", "");
    }
    id = $(e.currentTarget).attr("student-id");
    e.currentTarget.id = "stactive";
    Student.showInfoPanel();
    $("#delete").visible();
    $("#delete").unbind('click');
    $("#delete").click(function () {
        Student.delete(id);
    });
    $("#text").html($("#" + e.currentTarget.id + " a").html());
    $("#sb").find("button").unbind('click');
    $("#sb").find("button").click(function () {
        Student.update("api/student/", id);
    });
    Student.getById(id);
}


Student.showInfoPanel = function () {
    $("#stlist").attr("class", "stlista");
    $("#studentinf").css("display", "block");
    $("#backref").visible();
    $("#sb").visible();
    $("#mainform").trigger('reset');
    Subject.getAllData();
    drawPieChart(75, 52);
}


Student.showAddPanel = function () {
    Student.showInfoPanel();
    $("#text").html("Добавление студента")
    $("#delete").invisible();

    if ($("#stactive")) {
        $("#stactive").attr("id", "");
    }
    $("#sb button").unbind('click');
    $("#sb button").click(function () {
        Student.update("/api/group/")
    });
}