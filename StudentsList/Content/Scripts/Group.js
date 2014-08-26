function Group(groupId, groupName) {
    this.id = groupId;
    this.name = groupName;
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
        list.push(new Group(this.Id, this.Name));
    });
    var s = $("<select id=\"gl\" />").change(function () {
        $("select option:selected").each(function () {
            groupId = $(this).val();
            Student.getAllData(groupId);
        })
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