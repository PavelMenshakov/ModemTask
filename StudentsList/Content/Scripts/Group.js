function Group(data) {
    this.id = data.Id;
    this.name = data.Name;
    this.students = 0;
    this.getJSONString = function () {
        return {
            "Id": this.id,
            "Name": this.name,
            "Students": this.students
        };
    }
}

Group.getAllData = function () {
    $.getJSON("/api/group", Group.pasteAllData);
}

Group.pasteAllData = function (data) {
    var list = new Array();
    $(data).each(function () {
        list.push(new Group(this));
    });
    var s = $("<select/>").change(function () {
            Student.getAllData($(this).val());
    });
    $(list).each(function () {
        $("<option />", {
            value: this.id,
            text: this.name
        }).appendTo(s);
    });
    s.appendTo(".grouplist");
    s.change();
}