function Student(id, fName, lName, sName, sex, bDate, incomDate, subjects) {
    this._id = id;
    this._fName = fName;
    this._lName = lName;
    this._sName = sName;
    this._sex = sex;
    this._bDate = bDate;
    this._incomDate = incomDate;
    this._subjects = subjects;

    this.addSubject = function (newSubject) {
        this._subjects.push(newSubject);
    };

    this.add = function () {
        if (!validateFields()) {
            return;
        }
        this.getWindowValue();
        $.ajax({
            type: 'POST',
            url: '/api/student',
            data: this.getJSONObject(),
            success: Student.getAllData()
        });
    }

    this.save = function (id) {
        if (!validateFields()) {
            return;
        }
        this.getWindowValue(id);
        $.ajax({
            type: 'POST',
            url: '/api/student/' + id,
            data: this.getJSONObject(),
            success: Student.getAllData()
        });
    }

    this.printStudent = function () {
        $(table).append(
           $("<tr/>").append(
               $("<td/>").append(
                   $("<div/>").click(function () {
                       focusStudent(this, data[i].id)
                   }).append(
                       $("<a/>").attr("class", "student").text(data[i].LName + " " + data[i].FName + " " + data[i].SName)
                   )
               )
           )
       );
    }

    this.getWindowValue = function (id) {
        this._id = id;
        this._fName= $("[name = 'fname']").val();
        this._lName= $("[name = 'lname']").val();
        this._sName= $("[name = 'sname']").val();
        this._sex= $("#male").is(":checked");
        this._bDate= $("[name = 'bday']").val();
        this._incomDate = $("[name = 'incomday']").val();
    }

    this.getJSONObject = function () {
        return {
            "Id": this._id,
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

Student.getAllData = function () {
    $.getJSON("/api/student", Student.pasteAllData);
}

Student.pasteAllData = function (data) {
    var table = $("#stlist").find("table");
    $(table).empty();
    $(data).each(function () {
        $(table).append(
            $("<tr/>").append(
                $("<td/>").append(
                    $("<div/>").attr("onclick", "Student.focus(this,"+this.Id+")").append(
                        $("<a/>").attr("class", "student").text(this.LName + " " + this.FName + " " + this.SName)
                    ).attr("id", this.Id)
                )
            )
        );
    });
}

Student.pasteAllDataV2 = function (data) {
    var table = $("#stlist").find("table");
    $(table).empty();
    var students = new Array();
    $(data).each(function () {
        var st = new Student(this.id,
            this.FName,
            this.LName,
            this.SName,
            this.Sex,
            this.BDate,
            this.IncomDate,
            this.Subjects)
        students.push(st);
    });
    $(students).each(this.printStudent);
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

}

Student.delete = function (id) {
    $.ajax({
        type: 'DELETE',
        url: '/api/student/' + id,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: Student.getAllData
    });
}

Student.insertNew = function() {
    var st = new Student();
    st.add();
}

Student.update = function (Id) {
    var st = new Student();
    st.save(Id);
}

Student.getById = function (id) {
    $.getJSON("/api/student/" + id, Student.pasteData);
}

Student.focus = function(e, id) {
    if ($("#stactive")) {
        $("#stactive").attr("id", "");
    }
    e.id = "stactive";
    showInfoWindow();
    $("#delete").css("visibility", "visible");
    $("#delete").attr('onclick', '').unbind('click');
    $("#delete").click(function () {
        Student.delete(id);
    });
    $("#text").html($("#" + e.id + " a").html());
    $("#sb").find("button").attr('click', '').unbind('click');
    $("#sb").find("button").click(function () {
        Student.update(id);
    });
    Student.getById(id);
}
