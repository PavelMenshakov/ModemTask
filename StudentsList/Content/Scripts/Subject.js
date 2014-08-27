function Subject(Name, Hours) {
    this._id = 0;
    this._name = Name;
    this._hours = Hours;

    this.getJSONObject = function () {
        return {
            "Id": this._id,
            "Name": this._name,
            "Hours": this._hours
        };
    }

    this.addSubject = function () {
        $.ajax({
            type: 'POST',
            url: '/api/subject',
            data: this.getJSONObject(),
            success: Subject.getAllData
        });
    }

    this.getWindowValue = function () {
        this._name = $("[name = 'SubjectName']").val();
        this._hours = $("[name = 'SubjectHours']").val();
    }
}

Subject.getSubjectsArray = function () {
    var subjects = new Array();
    var list = $("#odjectsTable input:checked");
    list.each(function () {
            var sub = new Subject(this.title, this.value);
            sub._id = this.id.slice(7);
            subjects.push(sub.getJSONObject());
    });
    return subjects;
}

Subject.getAllData = function () {
    $.getJSON("/api/Subject", Subject.pasteAllData);
}

Subject.showInsertWindow = function () {
    $("body").append(
        $("<div/>").attr("id", "subjectbox").append(
            $("<h2/>").text('Добавление предмета'),
            $("<br/>"),
            $("<input/>", {
                type: 'text',
                name: 'SubjectName'
            }),
            $("<br/>"),
            $("<input/>", {
                type: 'text',
                name: 'SubjectHours'
            }),
            $("<br/>"),
            $("<input/>", {
                type: 'button',
                value: 'Добавить'
            }).click(Subject.insertNew),
            $("<input/>", {
                type: 'button',
                value: 'Отмена'
            }).click(function () {
                $("#subjectbox").remove()
            })
        )
    );

}

Subject.pasteAllData = function (data) {
    $("#odjectsTable").empty();
    for (var i = 0; i < data.length; i++) {
        $("#odjectsTable").append(
            $("<div/>").append(
                $("<input/>", {
                    type: 'checkbox',
                    title: data[i].Name,
                    id: 'subject' + data[i].Id,
                    value: data[i].Hours,
                }).change(drawChart),
                data[i].Name
            )
        );
    }
}

Subject.insertNew = function () {
    var newSubject = new Subject();
    newSubject.getWindowValue();
    newSubject.addSubject();
    $("#subjectbox").remove();
}