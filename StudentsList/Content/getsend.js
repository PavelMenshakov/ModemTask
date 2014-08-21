function getJData() {
    $.getJSON("/api/default3", pastJData);
}

function getJDataByid(id) {
    $.getJSON("/api/default1/" + id, pastData);
}

function saveData(id) {
    if (!validateFields()) {
        return;
    }
    $.ajax({
        type: 'POST',
        url: '/api/default1/' + id,
        data: getSendingData(id),
        success: function () {
            getJData();
        }
    });
}

function insertData() {
    if (!validateFields()) {
        return;
    }
    $.ajax({
        type: 'POST',
        url: '/api/default1/',
        data: getSendingData("-1"),
        success: function () {
            getJData();
        }
    });
}

function getSendingData(id) {
    return {
        "Id": id,
        "FName": $("[name = 'fname']").val(),
        "LName": $("[name = 'lname']").val(),
        "SName": $("[name = 'sname']").val(),
        "Sex": $("#male").is(":checked"),
        "BDate": $("[name = 'bday']").val(),
        "IncomDate": $("[name = 'incomday']").val()
    };
}

function deleteData(id) {
    $.ajax({
        type: 'DELETE',
        url: '/api/default1/' + id,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function () {
            getJData();
        }
    });
}


function pastData(data) {
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

function pastJData(data) {
    $("#stlist table").html("");
    for (var i = 0; i < data.length; i++) {
        $("#stlist table").append("<tr><td><div onclick='focusStudent(this," + data[i].id + ")'><a class='student'>" + data[i].LName + " " + data[i].FName + " " + data[i].SName + "</a></div></td></tr>");
    }
}